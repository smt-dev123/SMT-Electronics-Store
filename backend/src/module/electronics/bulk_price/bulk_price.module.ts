import { Module } from '@nestjs/common';
import { BulkPriceService } from './bulk_price.service';
import { BulkPriceController } from './bulk_price.controller';

@Module({
  controllers: [BulkPriceController],
  providers: [BulkPriceService],
  exports: [BulkPriceService],
})
export class BulkPriceModule {}
