import { Injectable } from '@nestjs/common';
import { CreateBulkPriceDto } from './dto/create-bulk-price.dto';
import { UpdateBulkPriceDto } from './dto/update-bulk-price.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BulkPriceService {
  constructor(private readonly prisma: PrismaService) { }

  create(createBulkPriceDto: CreateBulkPriceDto) {
    return this.prisma.bulkPrice.create({
      data: createBulkPriceDto
    });
  }

  findAll() {
    return this.prisma.bulkPrice.findMany();
  }

  findOne(id: string) {
    return this.prisma.bulkPrice.findUnique({
      where: { id }
    });
  }

  update(id: string, updateBulkPriceDto: UpdateBulkPriceDto) {
    return this.prisma.bulkPrice.update({
      where: { id },
      data: updateBulkPriceDto
    });
  }

  remove(id: string) {
    return this.prisma.bulkPrice.delete({
      where: { id }
    });
  }
}
