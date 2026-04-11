import { Module } from '@nestjs/common';
import { BulkPriceService } from './bulk-price.service';
import { BulkPriceController } from './bulk-price.controller';

@Module({
  controllers: [BulkPriceController],
  providers: [BulkPriceService],
})
export class BulkPriceModule {}
