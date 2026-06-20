import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateDatasheetDto } from 'src/module/electronics/datasheets/dto/create-datasheet.dto';
import { CreateElectronicDto } from 'src/module/electronics/electronics/dto/create-electronic.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  // @IsNotEmpty()
  // @IsString()
  // slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'stockQty must not be less than 0' })
  stockQty!: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price!: number;

  @IsNotEmpty()
  specifications!: object;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  discount!: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean = true;

  @IsNotEmpty()
  @IsBoolean()
  isUsed: boolean = false;

  @IsOptional()
  @IsString()
  brandId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  brandName?: string;

  @IsOptional()
  categoryName?: string;

  @IsOptional()
  @IsString()
  datasheetId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return undefined;
      }
    }
    return value;
  })
  @IsObject()
  @Type(() => CreateDatasheetDto)
  datasheet?: CreateDatasheetDto;

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
  @Type(() => CreateElectronicDto)
  electronics?: CreateElectronicDto;

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
  bulkPrice?: any;
}
