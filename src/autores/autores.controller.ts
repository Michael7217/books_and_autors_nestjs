import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { CreateAutoreDto } from './dto/create-autore.dto.js';
import { UpdateAutoreDto } from './dto/update-autore.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAutoreDto: CreateAutoreDto, @Request() req: any ) {
    return this.autoresService.create(createAutoreDto, req.user.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.autoresService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateAutoreDto: UpdateAutoreDto) {
    return this.autoresService.update(+id, updateAutoreDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.autoresService.remove(+id);
  }
}
