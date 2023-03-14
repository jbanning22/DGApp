import { IsInt, IsOptional, IsString } from 'class-validator';

export class EditThrowById {
  @IsString()
  @IsOptional()
  disc?: string;

  @IsString()
  @IsString()
  distance: string;

  @IsString()
  @IsOptional()
  throwtype?: string;
}
