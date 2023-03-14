import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MeasuredThrowsDto {
  @IsString()
  @IsNotEmpty()
  disc: string;

  @IsString()
  @IsOptional()
  throwtype?: string;

  @IsString()
  @IsString()
  distance: string;

  @IsOptional()
  @IsString()
  color?: string;
}
