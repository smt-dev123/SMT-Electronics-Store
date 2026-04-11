import { IsString } from "class-validator";

export class CreateElectronicDto {
    @IsString()
    sku!: string;

    @IsString()
    package!: string;

    @IsString()
    productId!: string;

    @IsString()
    typeId!: string;
}
