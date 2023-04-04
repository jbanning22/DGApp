// import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MeasuredThrowsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  disc: string;

  //   @ApiProperty()
  @IsString()
  @IsOptional()
  throwtype?: string;

  @ApiProperty()
  @IsString()
  @IsString()
  //   @Transform(({ value }) => parseInt(value))
  distance: string;

  //   @ApiProperty()
  @IsOptional()
  @IsString()
  color?: string;
}
