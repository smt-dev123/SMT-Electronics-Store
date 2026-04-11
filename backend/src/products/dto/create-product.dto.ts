import { IsBoolean, IsJSON, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name!: string;

    @IsString()
    slug!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    stockQty!: number;

    @IsNumber()
    price!: number;

    @IsNumber()
    @IsOptional()
    discount?: number;

    @IsJSON()
    @IsOptional()
    specifications?: object;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;

    @IsBoolean()
    @IsOptional()
    isUsed?: boolean = false;

    @IsString()
    brandId!: string;

    @IsString()
    categoryId!: string;
}
