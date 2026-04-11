// src/product-images/product-images.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) { }

  // ជំនួយការបង្កើតឈ្មោះ File កុំឱ្យជាន់គ្នា
  static storageConfig = diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  });

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: ProductImagesController.storageConfig }))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({ fileType: /^image\/(png|jpeg|gif)$/ }),
        ],
      }),
    ) file: Express.Multer.File,
    @Body() createDto: CreateProductImageDto
  ) {
    return this.productImagesService.create({
      ...createDto,
      imageUrl: file.filename,
    });
  }

  @Get()
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productImagesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', { storage: ProductImagesController.storageConfig }))
  async update(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({ fileType: /^image\/(png|jpeg|gif)$/ }),
        ],
        fileIsRequired: false, // File is optional for update
      }),
    ) file: Express.Multer.File,
    @Body() updateDto: UpdateProductImageDto
  ) {
    if (file) {
      return this.productImagesService.updateWithFile(id, updateDto, file.filename);
    }
    return this.productImagesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productImagesService.remove(id);
  }
}