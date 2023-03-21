import { IsOptional, IsString } from 'class-validator';

export class EditThrowDto {
  @IsString()
  @IsOptional()
  disc?: string;

  @IsString()
  @IsOptional()
  distance?: string;

  @IsString()
  @IsOptional()
  throwtype?: string;
}
