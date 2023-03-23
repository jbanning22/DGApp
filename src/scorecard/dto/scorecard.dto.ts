import { IsOptional, IsString } from 'class-validator';

export class ScorecardDto {
  @IsString()
  @IsOptional()
  courseName: string;
}
