import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    password!: string;

    @IsEnum(['ADMIN', 'MANAGER', 'CUSTOMER', 'USER'])
    @IsOptional()
    role?: 'ADMIN' | 'MANAGER' | 'CUSTOMER' | 'USER' = 'USER';

    @IsString()
    @IsOptional()
    profile?: string;

}
