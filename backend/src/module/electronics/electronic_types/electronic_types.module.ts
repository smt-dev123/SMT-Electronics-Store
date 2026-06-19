import { Module } from '@nestjs/common';
import { ElectronicTypesService } from './electronic_types.service';
import { ElectronicTypesController } from './electronic_types.controller';

@Module({
  controllers: [ElectronicTypesController],
  providers: [ElectronicTypesService],
})
export class ElectronicTypesModule {}
