import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userName: dto.userName,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        city: dto.city,
        state: dto.state,
      },
    });

    delete user.hash;

    return user;
  }

  async deleteUserById(userId: number) {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return { msg: 'user deleted' };
  }
}
