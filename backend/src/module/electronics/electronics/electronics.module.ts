import { Module } from '@nestjs/common';
import { ElectronicsService } from './electronics.service';
import { ElectronicsController } from './electronics.controller';
import { ElectronicTypesModule } from '../electronic_types/electronic_types.module';

@Module({
  imports: [ElectronicTypesModule],
  controllers: [ElectronicsController],
  providers: [ElectronicsService],
  exports: [ElectronicsService],
})
export class ElectronicsModule {}
