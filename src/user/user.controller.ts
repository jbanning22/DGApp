import { Controller, Get, UseGuards } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: Users) {
    return user;
  }
}
