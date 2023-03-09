import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MeasuredThrowsDto {
  @IsString()
  @IsNotEmpty()
  disc: string;

  @IsString()
  @IsOptional()
  throwtype?: string;

  @IsNotEmpty()
  @IsInt()
  distance: number;

  @IsOptional()
  @IsString()
  color?: string;
}
