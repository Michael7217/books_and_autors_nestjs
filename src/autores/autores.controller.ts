import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { CreateAutoreDto } from './dto/create-autore.dto.js';
import { UpdateAutoreDto } from './dto/update-autore.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('autores')
@ApiBearerAuth() //exige o bearer de autenticação em todas as rotas desse controller
@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  @UseGuards(AuthGuard)
  //@ApiBearerAuth() exige apenas nessa rota
  //documenta a rota
  @ApiOperation({
    summary: 'criação de um novo autor',
    description: 'Essa rota é responsável por criar um novo autor',
  }) 
  // exemplos de resposta 
  @ApiResponse({
    status: 201,
    description: 'Autor cadastrado com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'Francisco Silva',
        idade: 20,
        email: 'francisco@example.com',
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  create(@Body() createAutoreDto: CreateAutoreDto, @Request() req: any) {
    return this.autoresService.create(createAutoreDto, req.user.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Listar autores', description: 'Retorna autores e seus livros.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de autores',
    schema: {
      example: [
        {
          id: 1,
          nome: 'Francisco Silva',
          idade: 20,
          email: 'francisco@example.com',
          userId: 1,
          livros: 'nenhum livro cadastrado',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Nenhum autor encontrado' })
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar autor pelo ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do autor' })
  @ApiResponse({
    status: 200,
    description: 'Autor encontrado',
    schema: {
      example: {
        id: 1,
        nome: 'Francisco Silva',
        idade: 20,
        email: 'francisco@example.com',
        userId: 1,
        livros: 'nenhum livro cadastrado',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  findOne(@Param('id') id: string) {
    return this.autoresService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualizar autor' })
  @ApiResponse({
    status: 200,
    description: 'Autor atualizado com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'Francisco Silva',
        idade: 21,
        email: 'francisco@example.com',
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  //ja documenta o param automaticamente em rotas que tem param
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do autor a atualizar' })
  update(@Param('id') id: string, @Body() updateAutoreDto: UpdateAutoreDto) {
    return this.autoresService.update(+id, updateAutoreDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Remover autor' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID do autor' })
  @ApiResponse({
    status: 200,
    description: 'Autor removido com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'Francisco Silva',
        idade: 20,
        email: 'francisco@example.com',
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Acesso não autorizado' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  remove(@Param('id') id: string) {
    return this.autoresService.remove(+id);
  }
}
