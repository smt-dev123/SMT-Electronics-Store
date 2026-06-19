import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';
import { DRIZZLE_PROVIDER } from 'src/core/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/core/database/schema';
import { nanoid } from 'nanoid';

@Injectable()
export class ImagesService {
  private s3Client: S3Client;
  private bucketName: string;
  private publicUrl: string;

  constructor(
    private configService: ConfigService,
    @Inject(DRIZZLE_PROVIDER) private db: NodePgDatabase<typeof schema>,
  ) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID') ?? '';
    const accessKeyId =
      this.configService.get<string>('R2_ACCESS_KEY_ID') ?? '';
    const secretAccessKey =
      this.configService.get<string>('R2_SECRET_ACCESS_KEY') ?? '';

    this.bucketName = this.configService.get<string>('R2_BUCKET_NAME') ?? '';
    this.publicUrl = this.configService.get<string>('R2_PUBLIC_URL') ?? '';

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadToR2Only(file: Express.Multer.File, productId?: string) {
    if (!file) {
      throw new Error('File is required');
    }

    try {
      const webpBuffer = await sharp(file.buffer)
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${nanoid()}.webp`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: webpBuffer,
          ContentType: 'image/webp',
        }),
      );

      return `${this.publicUrl}/${fileName}`;
    } catch (error) {
      console.error('Error uploading image to R2:', error);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async deleteFromR2(fileUrl: string) {
    if (!fileUrl) return;

    try {
      const fileName = fileUrl.split('/').pop();

      if (fileName) {
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
          }),
        );
        console.log(`Successfully deleted orphaned image from R2: ${fileName}`);
      }
    } catch (error) {
      console.error('Failed to delete image from R2:', error);
    }
  }
}
