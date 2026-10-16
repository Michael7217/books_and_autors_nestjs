import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LivrosService } from './livros.service.js';
import { CreateLivroDto } from './dto/create-livro.dto.js';
import { UpdateLivroDto } from './dto/update-livro.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('livros')
@ApiBearerAuth()
@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Cadastrar livro' })
  @ApiResponse({
    status: 201,
    description: 'Livro cadastrado',
    schema: {
      example: {
        id: 1,
        titulo: 'Dom Casmurro',
        descricao: 'Romance de Machado de Assis',
        autorId: 1,
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Autor não cadastrado' })
  @ApiResponse({ status: 409, description: 'Livro já cadastrado' })
  create(@Body() createLivroDto: CreateLivroDto, @Request() req: any) {
    return this.livrosService.create({
      ...createLivroDto,
      titulo: createLivroDto.titulo.toLocaleLowerCase(),
      descricao: createLivroDto.descricao,
      autorId: Number(createLivroDto.autorId),
    }, req.user.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Listar livros', description: 'Retorna livros com seus autores.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros',
    schema: {
      example: [
        {
          id: 1,
          titulo: 'Dom Casmurro',
          descricao: 'Romance de Machado de Assis',
          autorId: 1,
          userId: 1,
          autor: { id: 1, nome: 'Machado de Assis' },
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 409, description: 'Nenhum livro encontrado' })
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar livro pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do livro' })
  @ApiResponse({
    status: 200,
    description: 'Livro encontrado com seu autor',
    schema: {
      example: {
        id: 1,
        titulo: 'Dom Casmurro',
        descricao: 'Romance de Machado de Assis',
        autorId: 1,
        userId: 1,
        autor: { id: 1, nome: 'Machado de Assis' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  findOne(@Param('id') id: string) {
    return this.livrosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualizar livro' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do livro' })
  @ApiResponse({
    status: 200,
    description: 'Livro atualizado',
    schema: {
      example: {
        id: 1,
        titulo: 'Dom Casmurro',
        descricao: 'Romance de Machado de Assis',
        autorId: 1,
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  update(@Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livrosService.update(+id, updateLivroDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remover livro' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do livro' })
  @ApiResponse({
    status: 200,
    description: 'Livro removido',
    schema: {
      example: {
        id: 1,
        titulo: 'Dom Casmurro',
        descricao: 'Romance de Machado de Assis',
        autorId: 1,
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  remove(@Param('id') id: string) {
    return this.livrosService.remove(+id);
  }
}
