import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ScorecardDto {
  @IsString()
  @IsOptional()
  courseName: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  courseLength: number;
}
