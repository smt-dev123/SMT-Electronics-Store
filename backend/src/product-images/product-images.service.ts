// src/product-images/product-images.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(private prisma: PrismaService) { }

  private readonly uploadPath = join(process.cwd(), 'uploads');

  async create(createDto: CreateProductImageDto) {
    const { productId, imageUrl, ...rest } = createDto;

    return this.prisma.productImage.create({
      data: {
        ...rest,
        imageUrl: imageUrl,
        // ប្រើ connect ដើម្បីភ្ជាប់ជាមួយ Product ID ដែលមានស្រាប់
        product: {
          connect: { id: productId }
        }
      },
    });
  }

  async findAll() {
    return this.prisma.productImage.findMany();
  }

  async findOne(id: string) {
    const image = await this.prisma.productImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('រកមិនឃើញរូបភាពនេះទេ');
    return image;
  }

  // លុប File ចេញពី Folder
  private async deletePhysicalFile(filename: string) {
    const filePath = join(this.uploadPath, filename);
    if (existsSync(filePath)) {
      try {
        await unlink(filePath);
      } catch (err) {
        console.error('លុប File បរាជ័យ:', err);
      }
    }
  }

  async update(id: string, updateDto: UpdateProductImageDto) {
    return this.prisma.productImage.update({
      where: { id },
      data: updateDto,
    });
  }

  async updateWithFile(id: string, updateDto: UpdateProductImageDto, newFilename: string) {
    const currentImage = await this.findOne(id);
    if (currentImage.imageUrl) {
      await this.deletePhysicalFile(currentImage.imageUrl);
    }

    return this.prisma.productImage.update({
      where: { id },
      data: {
        ...updateDto,
        imageUrl: newFilename,
      },
    });
  }

  async remove(id: string) {
    const image = await this.findOne(id);
    if (image.imageUrl) {
      await this.deletePhysicalFile(image.imageUrl);
    }
    return this.prisma.productImage.delete({ where: { id } });
  }
}