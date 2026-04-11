import { IsOptional, IsString } from "class-validator";

export class CreateProductImageDto {
    @IsString()
    @IsOptional()
    imageUrl: string = "";

    @IsString()
    productId!: string;
}
