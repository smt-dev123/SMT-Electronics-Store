import { Injectable } from '@nestjs/common';
import { CreateDatasheetDto } from './dto/create-datasheet.dto';
import { UpdateDatasheetDto } from './dto/update-datasheet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatasheetsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createDatasheetDto: CreateDatasheetDto) {
    return this.prisma.datasheet.create({
      data: createDatasheetDto,
    });
  }

  findAll() {
    return this.prisma.datasheet.findMany();

  }

  findOne(id: string) {
    return this.prisma.datasheet.findUnique({
      where: { id },
    });
  }

  update(id: string, updateDatasheetDto: UpdateDatasheetDto) {
    return this.prisma.datasheet.update({
      where: { id },
      data: updateDatasheetDto,
    });
  }

  remove(id: string) {
    return this.prisma.datasheet.delete({
      where: { id },
    });
  }
}
