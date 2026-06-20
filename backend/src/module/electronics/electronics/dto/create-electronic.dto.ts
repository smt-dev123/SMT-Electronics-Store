import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateElectronicTypeDto } from '../../electronic_types/dto/create-electronic_type.dto';
import { CreateFeatureDto } from '../../features/dto/create-feature.dto';

export class CreateElectronicDto {
  @IsNotEmpty()
  @IsString()
  sku!: string;

  @IsNotEmpty()
  @IsString()
  package!: string;

  @IsOptional()
  @IsString()
  electronicTypeId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  })
  @IsObject()
  @Type(() => CreateElectronicTypeDto)
  electronicType?: CreateElectronicTypeDto;

  @IsOptional()
  @IsString()
  featureId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFeatureDto)
  features?: CreateFeatureDto[];

  @IsOptional()
  @IsUUID()
  productId?: string;
}
