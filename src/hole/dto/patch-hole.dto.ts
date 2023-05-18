import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PatchHoleDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  strokes: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  par: number;
}
