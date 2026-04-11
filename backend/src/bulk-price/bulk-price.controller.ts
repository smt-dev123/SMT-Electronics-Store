import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BulkPriceService } from './bulk-price.service';
import { CreateBulkPriceDto } from './dto/create-bulk-price.dto';
import { UpdateBulkPriceDto } from './dto/update-bulk-price.dto';

@Controller('bulk-price')
export class BulkPriceController {
  constructor(private readonly bulkPriceService: BulkPriceService) { }

  @Post()
  create(@Body() createBulkPriceDto: CreateBulkPriceDto) {
    return this.bulkPriceService.create(createBulkPriceDto);
  }

  @Get()
  findAll() {
    return this.bulkPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bulkPriceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBulkPriceDto: UpdateBulkPriceDto) {
    return this.bulkPriceService.update(id, updateBulkPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulkPriceService.remove(id);
  }
}
