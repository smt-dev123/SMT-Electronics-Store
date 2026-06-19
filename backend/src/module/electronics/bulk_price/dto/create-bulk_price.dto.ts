import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBulkPriceDto {
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0, { message: 'Quantity must be a positive number' })
  qty!: number;

  @IsNotEmpty()
  @Type(() => Number)
  @Min(0, { message: 'Price must be a positive number' })
  price!: number;

  @IsNotEmpty()
  @IsString()
  productId!: string;
}
