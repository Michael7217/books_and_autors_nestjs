import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LivrosService } from './livros.service.js';
import { CreateLivroDto } from './dto/create-livro.dto.js';
import { UpdateLivroDto } from './dto/update-livro.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.livrosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livrosService.update(+id, updateLivroDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.livrosService.remove(+id);
  }
}
