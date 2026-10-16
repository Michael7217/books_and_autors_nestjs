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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Entrar e obter um token de acesso' })
  @ApiBody({ type: LoginauthDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado',
    schema: { example: { access_token: 'eyJhbGciOi...' } },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiResponse({ status: 404, description: 'Usuário não cadastrado' })
  signIn(@Body() LoginauthDto: LoginauthDto) {
    return this.authService.signIn(LoginauthDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Cadastrar usuário' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado',
    schema: {
      example: { id: 1, nome: 'Francisco Silva', email: 'francisco@example.com' },
    },
  })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  signUp(@Body() params: Prisma.usersCreateInput) {
    return this.authService.signup(params);
  }
  

  // @Get()
  // user(@Param('id', ParseIntPipe) id: number) {
  //   return this.authService.(id);
  // }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza os dados do usuário identificado pelo ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
    description: 'ID numérico do usuário a atualizar',
  })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    schema: {
      example: { id: 1, nome: 'Francisco Silva', email: 'francisco@example.com' },
    },
  })
  @ApiResponse({ status: 400, description: 'ID inválido; deve ser um número inteiro' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover usuário',
    description: 'Remove o usuário identificado pelo ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
    description: 'ID numérico do usuário a remover',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido',
    schema: {
      example: { id: 1, nome: 'Francisco Silva', email: 'francisco@example.com' },
    },
  })
  @ApiResponse({ status: 400, description: 'ID inválido; deve ser um número inteiro' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authService.remove(id);
  }
}
