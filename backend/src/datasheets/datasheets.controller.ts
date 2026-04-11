import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatasheetsService } from './datasheets.service';
import { CreateDatasheetDto } from './dto/create-datasheet.dto';
import { UpdateDatasheetDto } from './dto/update-datasheet.dto';

@Controller('datasheets')
export class DatasheetsController {
  constructor(private readonly datasheetsService: DatasheetsService) { }

  @Post()
  create(@Body() createDatasheetDto: CreateDatasheetDto) {
    return this.datasheetsService.create(createDatasheetDto);
  }

  @Get()
  findAll() {
    return this.datasheetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datasheetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatasheetDto: UpdateDatasheetDto) {
    return this.datasheetsService.update(id, updateDatasheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datasheetsService.remove(id);
  }
}
