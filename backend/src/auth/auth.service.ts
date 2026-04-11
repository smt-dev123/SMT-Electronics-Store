import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  async register(registerAuthDto: RegisterAuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerAuthDto.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    const newUser = await this.userService.create({
      ...registerAuthDto,
    });

    const token = this.jwtService.sign({ userId: newUser.id });

    return {
      user: newUser,
      access_token: token,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginAuthDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }

    const isPasswordMatch = await this.userService.comparePassword(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid email or password.');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role,
    });

    return {
      access_token: token,
      token_type: 'bearer',
    };
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return user;
  }
}