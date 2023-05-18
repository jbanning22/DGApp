import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HoleDto {
  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  holeNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  strokes?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  par?: number;

  //   @ApiProperty()
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  scorecardId?: number;
}
