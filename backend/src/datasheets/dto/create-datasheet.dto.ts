import { IsOptional, IsString } from "class-validator";

export class CreateDatasheetDto {
    @IsString()
    name!: string;

    @IsString()
    size!: string;

    @IsString()
    fileUrl!: string;

    @IsString()
    @IsOptional()
    productId?: string;
}
