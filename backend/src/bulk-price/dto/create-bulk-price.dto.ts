import { IsNumber, IsString } from "class-validator";

export class CreateBulkPriceDto {
    @IsNumber()
    minQty!: number;

    @IsNumber()
    price!: number;

    @IsString()
    electronicId!: string;
}
