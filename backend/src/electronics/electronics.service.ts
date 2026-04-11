import { Injectable } from '@nestjs/common';
import { CreateElectronicDto } from './dto/create-electronic.dto';
import { UpdateElectronicDto } from './dto/update-electronic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ElectronicsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createElectronicDto: CreateElectronicDto) {
    return this.prisma.electronic.create({
      data: createElectronicDto,
    });
  }

  findAll() {
    return this.prisma.electronic.findMany();
  }

  findOne(id: string) {
    return this.prisma.electronic.findUnique({
      where: { id },
    });
  }

  update(id: string, updateElectronicDto: UpdateElectronicDto) {
    return this.prisma.electronic.update({
      where: { id },
      data: updateElectronicDto,
    });
  }

  remove(id: string) {
    return this.prisma.electronic.delete({
      where: { id },
    });
  }
}
