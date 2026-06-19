import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateElectronicDto {
  @IsNotEmpty()
  @IsString()
  sku!: string;

  @IsNotEmpty()
  @IsString()
  package!: string;

  @IsOptional()
  @IsString()
  featureId?: string;

  @IsOptional()
  @IsString()
  electronicTypeId?: string;

  @IsOptional()
  @IsString()
  productId?: string;
}
