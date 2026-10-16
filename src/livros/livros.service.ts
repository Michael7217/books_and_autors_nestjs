import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto.js';
import { UpdateLivroDto } from './dto/update-livro.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class LivrosService {
  constructor(private readonly Prisma: PrismaService) {}

  async create(createLivroDto: CreateLivroDto, id: number) {
    const livroexiste = await this.Prisma.livros.findFirst({
      //pesquisa por qualquer coisa
      where: {
        titulo: createLivroDto.titulo,
      },
    });
    const autorexiste = await this.Prisma.autores.findUnique({
      where: { id: createLivroDto.autorId },
    });
    if (livroexiste) {
      throw new ConflictException('livro já cadastrado');
    }
    if (!autorexiste) {
      throw new NotFoundException('autor não cadastrado');
    }
    return await this.Prisma.livros.create({
      data: { ...createLivroDto, userId: id },
    });
  }

  async findAll() {
    const livros = await this.Prisma.livros.findMany({
      include: {
        autor: true,
      },
    }); // busca todos
    if (!livros.length) {
      throw new ConflictException('Nenhum livro encontrado');
    }
    return livros;
  }

  async findOne(id: number) {
    const livro = await this.Prisma.livros.findUnique({
      //busca unica
      where: { id },
      include: {
        autor: true,
      },
    });
    if (!livro) {
      throw new NotFoundException('livro não encontrado');
    }
    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const livro = await this.Prisma.livros.findUnique({
      where: { id },
    });
    if (!livro) {
      throw new NotFoundException('livro não encontrado');
    }
    return await this.Prisma.livros.update({
      where: { id },
      data: { ...updateLivroDto },
    });
  }

  async remove(id: number) {
    const livroexiste = await this.Prisma.livros.findUnique({
      where: { id },
    });
    if (!livroexiste) {
      throw new NotFoundException('livro não encontrado');
    }
    return await this.Prisma.livros.delete({
      where: { id },
    });
  }
}
