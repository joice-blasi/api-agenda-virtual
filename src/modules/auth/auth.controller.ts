import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.email)
  }
}
