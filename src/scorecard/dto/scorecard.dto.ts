import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ScorecardDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  courseName: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  courseLength: number;

  //   @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
