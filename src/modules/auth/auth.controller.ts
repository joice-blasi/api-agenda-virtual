import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

interface IUserLogin {
  email: string,
  password: string
}

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: IUserLogin) {
    return this.authService.login(user.email)
  }
}
