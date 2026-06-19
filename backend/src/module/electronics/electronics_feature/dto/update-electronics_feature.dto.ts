import { PartialType } from '@nestjs/mapped-types';
import { CreateElectronicsFeatureDto } from './create-electronics_feature.dto';

export class UpdateElectronicsFeatureDto extends PartialType(CreateElectronicsFeatureDto) {}
