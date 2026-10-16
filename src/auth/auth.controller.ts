import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { LoginauthDto } from './dto/login-auth.dto.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() LoginauthDto: LoginauthDto) {
    return this.authService.signIn(LoginauthDto);
  }

  @Post('register')
  signUp(@Body() params: Prisma.usersCreateInput) {
    return this.authService.signup(params);
  }
  

  // @Get()
  // user(@Param('id', ParseIntPipe) id: number) {
  //   return this.authService.(id);
  // }

  @Patch()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authService.remove(id);
  }
}
