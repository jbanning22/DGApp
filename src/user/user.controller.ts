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
import { GetUserId } from '../auth/decorator/get-user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { EditUserDto } from './dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOkResponse()
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @ApiOkResponse()
  @Patch()
  editUser(@GetUserId('id') userId: number, @Body() dto: EditUserDto) {
    return this.usersService.editUser(userId, dto);
  }
  @ApiOkResponse()
  @Delete(':id')
  deleteUserById(@GetUserId('id') userId: number) {
    return this.usersService.deleteUserById(userId);
  }
}
