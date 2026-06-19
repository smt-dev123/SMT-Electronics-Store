import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ElectronicTypesService } from './electronic_types.service';
import { CreateElectronicTypeDto } from './dto/create-electronic_type.dto';
import { UpdateElectronicTypeDto } from './dto/update-electronic_type.dto';

@Controller('electronic-types')
export class ElectronicTypesController {
  constructor(
    private readonly ElectronicTypesService: ElectronicTypesService,
  ) {}

  @Post()
  create(@Body() createElectronicTypeDto: CreateElectronicTypeDto) {
    return this.ElectronicTypesService.create(createElectronicTypeDto);
  }

  @Get()
  findAll() {
    return this.ElectronicTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ElectronicTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElectronicTypeDto: UpdateElectronicTypeDto,
  ) {
    return this.ElectronicTypesService.update(id, updateElectronicTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ElectronicTypesService.remove(id);
  }
}
