import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDatasheetDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  file?: string;
}
