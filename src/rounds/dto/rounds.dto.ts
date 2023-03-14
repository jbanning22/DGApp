import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RoundDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @IsInt()
  @IsNotEmpty()
  score: number;
}
