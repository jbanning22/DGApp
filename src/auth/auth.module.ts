import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, ConfigService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
