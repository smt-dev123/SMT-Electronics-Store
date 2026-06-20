import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDatasheetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  file?: string;
}
