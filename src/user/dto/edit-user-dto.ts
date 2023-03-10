import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsInt()
  id?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;
}
