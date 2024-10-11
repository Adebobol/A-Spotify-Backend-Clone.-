import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LessThanOrEqual } from 'typeorm';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
