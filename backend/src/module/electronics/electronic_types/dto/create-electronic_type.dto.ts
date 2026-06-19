import { IsNotEmpty, IsString } from 'class-validator';

export class CreateElectronicTypeDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
