import { Module } from '@nestjs/common';
import { ElectronicsFeatureService } from './electronics_feature.service';
import { ElectronicsFeatureController } from './electronics_feature.controller';

@Module({
  controllers: [ElectronicsFeatureController],
  providers: [ElectronicsFeatureService],
})
export class ElectronicsFeatureModule {}
