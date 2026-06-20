import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ElectronicsService } from './electronics.service';
import { CreateElectronicDto } from './dto/create-electronic.dto';
import { UpdateElectronicDto } from './dto/update-electronic.dto';

@Controller('electronics')
export class ElectronicsController {
  constructor(private readonly electronicsService: ElectronicsService) {}

  @Post()
  create(@Body() createElectronicDto: CreateElectronicDto) {
    return this.electronicsService.create(createElectronicDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const pageNum = page ? parseInt(page, 10) : 1;
    return this.electronicsService.findAll(search, limitNum, pageNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electronicsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectronicDto: UpdateElectronicDto,
  ) {
    return this.electronicsService.update(id, updateElectronicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electronicsService.remove(id);
  }
}
