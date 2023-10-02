import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      //   console.log('signup dto is: ', dto);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          userName: dto.userName,
          city: dto.city,
          state: dto.state,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Password Incorrect');
    return this.signToken(user.id, user.email);
  }

  async resetPassword(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const hash = await argon.hash(dto.password);

    try {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signOut() {
    return {
      access_token: null,
      refresh_token: null,
    };
  }

  async newAccessToken(
    refresh_token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const decoded = await this.decodeRefreshToken(refresh_token);
    const payload = {
      userId: decoded.sub,
      email: decoded.email,
    };
    // console.log('refresh token inside of newAccessToken is: ', refresh_token);

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    const newTokens = await this.signToken(user.id, user.email);

    return {
      access_token: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
    };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: secret,
    });
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '4h',
      secret: secret,
    });
    return {
      access_token: token,
      refresh_token: refreshToken,
    };
  }
  async decodeRefreshToken(refresh_token: string) {
    try {
      const decoded = await this.jwt.verifyAsync(refresh_token, {
        secret: this.config.get('JWT_SECRET'),
      });
      return decoded;
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
