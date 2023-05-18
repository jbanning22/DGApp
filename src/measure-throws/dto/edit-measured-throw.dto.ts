// import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditThrowDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  disc?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  //   @Transform(({ value }) => parseInt(value))
  distance?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  throwtype?: string;
}
