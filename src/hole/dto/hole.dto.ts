import { IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class HoleDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  holeNumber: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  strokes: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  par: number;
}
