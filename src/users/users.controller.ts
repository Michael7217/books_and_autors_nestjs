import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado',
    schema: {
      example: { id: 1, nome: 'Francisco Silva', email: 'francisco@example.com' },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.CreateUser(createUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do usuário' })
  //documentação da rota
  @ApiOperation({
    summary: 'Buscar um usuario pelo ID',
    description: 'busca um usuario e retorna os dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado; retorna null se o ID não corresponder a um usuário.',
    schema: {
      type: 'object',
      nullable: true,
      example: {
        id: 1,
        email: 'francisco@example.com',
        nome: 'Francisco Silva',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'ID inválido; deve ser um número inteiro' })
  @ApiResponse({ status: 401, description: 'Token ausente ou inválido' })
  user(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.User({ id });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar usuário pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    schema: {
      example: { id: 1, nome: 'Francisco Silva', email: 'francisco@example.com' },
    },
  })
  @ApiResponse({ status: 400, description: 'ID inválido; deve ser um número inteiro' })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
    @ApiResponse({ status: 500, description: 'Erro ao atualizar o usuário' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.UpdateUser({
      where: { id },
      data: { ...updateUserDto },
    });
  }
}
