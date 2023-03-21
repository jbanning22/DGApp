import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.usersService.editUser(userId, dto);
  }

  @Delete(':id')
  deleteUserById(@GetUser('id') userId: number) {
    return this.usersService.deleteUserById(userId);
  }
}
