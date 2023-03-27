import { IsInt, IsOptional } from 'class-validator';
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

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  scorecardId?: number;
}
