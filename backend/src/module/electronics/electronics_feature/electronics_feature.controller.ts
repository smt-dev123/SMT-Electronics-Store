import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectronicsFeatureService } from './electronics_feature.service';
import { CreateElectronicsFeatureDto } from './dto/create-electronics_feature.dto';
import { UpdateElectronicsFeatureDto } from './dto/update-electronics_feature.dto';

@Controller('electronics-feature')
export class ElectronicsFeatureController {
  constructor(private readonly electronicsFeatureService: ElectronicsFeatureService) {}

  @Post()
  create(@Body() createElectronicsFeatureDto: CreateElectronicsFeatureDto) {
    return this.electronicsFeatureService.create(createElectronicsFeatureDto);
  }

  @Get()
  findAll() {
    return this.electronicsFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electronicsFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectronicsFeatureDto: UpdateElectronicsFeatureDto) {
    return this.electronicsFeatureService.update(+id, updateElectronicsFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electronicsFeatureService.remove(+id);
  }
}
