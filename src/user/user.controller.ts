import { Controller, Get } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: Users) {
    return user;
  }
}
