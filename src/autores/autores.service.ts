import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto.js';
import { UpdateAutoreDto } from './dto/update-autore.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { autore } from './entities/autore.entity.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AutoresService {
  constructor(private readonly Prisma: PrismaService,
    private readonly UsersService: UsersService
  ) {}

  async create(createAutoreDto: CreateAutoreDto, id: number) {
    const autorexiste = await this.Prisma.autores.findUnique({
      where: {
        email: createAutoreDto.email,
      },
    });
    if (autorexiste) {
      throw new ConflictException('este email já esta cadastrado');
    }

    const autor = await this.Prisma.autores.create({
      data: { ...createAutoreDto, userId: id },
    });
    return autor;
  }

  async findAll() {
    const autores: autore[] = await this.Prisma.autores.findMany({
      include: {
        // o objeto de livros vem junto
        livros: true,
      },
    });
    if (!autores.length) {
      throw new NotFoundException('não há autores cadastrados');
    }
    const naotemlivro = autores.every((autor) => {
      return autor.livros.length === 0;
    });
    return autores.map(({ livros, ...autor }) => ({
      ...autor,
      livros: livros.length === 0 ? 'nenhum livro cadastrado' : livros,
    }));
  }

  async findOne(id: number) {
    const autor = await this.Prisma.autores.findUnique({
      where: { id },
      include: {
        livros: true,
      },
    });
    if (!autor) {
      throw new NotFoundException('autor não encontrado');
    }
    return {
      ...autor,
      livros:
        autor.livros.length === 0 ? 'nenhum livro cadastrado' : autor.livros,
    };
  }

  async update(id: number, updateAutoreDto: UpdateAutoreDto) {
    const autoreditar = await this.Prisma.autores.findUnique({
      where: { id },
    });
    if (!autoreditar) {
      throw new NotFoundException('autor não registrado');
    }
    return this.Prisma.autores.update({
      where: { id },
      data: { ...updateAutoreDto },
    });
  }

  async remove(id: number) {
    const autordeletar = await this.Prisma.autores.findUnique({
      where: { id },
    });
    if (!autordeletar) {
      throw new NotFoundException('autor não encontrado');
    }
    return this.Prisma.autores.delete({
      where: { id },
    });
  }
}
