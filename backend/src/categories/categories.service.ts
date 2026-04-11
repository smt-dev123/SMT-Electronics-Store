import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    const data = this.prisma.category.create({
      data: createCategoryDto,
    });
    return data;
  }

  findAll() {
    const data = this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return data;
  }

  findOne(id: string) {
    const data = this.prisma.category.findUnique({
      where: { id },
    });
    if (!data) {
      throw new Error(`Category with id ${id} not found`);
    }
    return data;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const data = this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    if (!data) {
      throw new Error(`Category with id ${id} not found`);
    }
    return data;
  }

  remove(id: string) {
    const data = this.prisma.category.delete({
      where: { id },
    });
    if (!data) {
      throw new Error(`Category with id ${id} not found`);
    }
    return data;
  }
}
