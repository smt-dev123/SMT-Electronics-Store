import { PartialType } from '@nestjs/mapped-types';
import { CreateDatasheetDto } from './create-datasheet.dto';

export class UpdateDatasheetDto extends PartialType(CreateDatasheetDto) {}
