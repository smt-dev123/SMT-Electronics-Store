import { Injectable } from '@nestjs/common';
import { CreateElectronicsFeatureDto } from './dto/create-electronics_feature.dto';
import { UpdateElectronicsFeatureDto } from './dto/update-electronics_feature.dto';

@Injectable()
export class ElectronicsFeatureService {
  create(createElectronicsFeatureDto: CreateElectronicsFeatureDto) {
    return 'This action adds a new electronicsFeature';
  }

  findAll() {
    return `This action returns all electronicsFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} electronicsFeature`;
  }

  update(id: number, updateElectronicsFeatureDto: UpdateElectronicsFeatureDto) {
    return `This action updates a #${id} electronicsFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} electronicsFeature`;
  }
}
