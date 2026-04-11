import { Controller, Post, Body, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/shared /decorator/public.decorator';
import { CurrentUser } from 'src/shared /decorator/user.decorator';
import { RegisterAuthDto } from './dto/register-auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(
    @Body() loginDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response // ប្រើ passthrough ដើម្បីឱ្យ NestJS នៅតែ return data បានធម្មតា
  ) {
    const result = await this.authService.login(loginDto);

    // កំណត់ Cookie
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000,
    });

    return result;
  }

  @Public()
  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully.' };
  }

  @UseGuards(AuthGuard('jwt-strategy'))
  @Get('me')
  async getMe(@CurrentUser() user: any) {
    return this.authService.findUserById(user.userId);
  }
}