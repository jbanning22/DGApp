import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth flow')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse()
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signin(dto);
  }
}
