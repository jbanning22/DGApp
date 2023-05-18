import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  HttpException,
} from '@nestjs/common';
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
    // console.log('controller signup dto', dto);
    return this.authService.signup(dto);
  }

  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    // console.log(dto);
    return this.authService.signin(dto);
  }

  @ApiOkResponse()
  @Post('signout')
  signOut() {
    return this.authService.signOut();
  }

  @ApiOkResponse()
  @Post('refresh')
  refreshAccess(@Headers('authorization') authorizationHeader: string) {
    // console.log(
    //   'authorization header in refreshAccess is: ',
    //   authorizationHeader,
    // );
    if (!authorizationHeader) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const refreshToken = authorizationHeader.split(' ')[1];
    // console.log('refresh token in refreshAccess is: ', refreshToken);
    return this.authService.newAccessToken(refreshToken);
  }
}
