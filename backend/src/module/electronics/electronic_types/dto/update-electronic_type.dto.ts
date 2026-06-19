import { PartialType } from '@nestjs/mapped-types';
import { CreateElectronicTypeDto } from './create-electronic_type.dto';

export class UpdateElectronicTypeDto extends PartialType(
  CreateElectronicTypeDto,
) {}
