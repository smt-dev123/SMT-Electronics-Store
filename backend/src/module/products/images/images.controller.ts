import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
// import { CreateImageDto } from './dto/create-image.dto';
// import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('productId') productId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.imagesService.uploadToR2Only(file, productId);
  }

  async deleteFromR2(@Body('fileUrl') fileUrl: string) {
    return this.imagesService.deleteFromR2(fileUrl);
  }
}
