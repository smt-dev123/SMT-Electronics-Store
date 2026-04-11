import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createBrandDto: CreateBrandDto) {
    const data = this.prisma.brand.create({
      data: createBrandDto,
    });
    return data;
  }

  findAll() {
    const data = this.prisma.brand.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return data;
  }

  findOne(id: string) {
    const data = this.prisma.brand.findUnique({
      where: { id },
    });
    if (!data) {
      throw new Error(`Brand with id ${id} not found`);
    }
    return data;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const data = this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
    if (!data) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return data;
  }

  remove(id: string) {
    const data = this.prisma.brand.delete({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return data;
  }
}
