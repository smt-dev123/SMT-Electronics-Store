import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const emailExists = this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (!emailExists) {
      throw new Error('Email already exists');
    }

    const hash = await this.hashPassword(createUserDto.password);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hash,
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const emailExists = this.prisma.user.findUnique({
      where: {
        email: updateUserDto.email,
      },
    });

    if (!emailExists) {
      throw new Error('Email already exists');
    }

    const hash = updateUserDto.password ? await this.hashPassword(updateUserDto.password) : undefined;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: hash
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  hashPassword = async (password: string) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  comparePassword = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  };
}

