import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto.js';
import { UpdateAutoreDto } from './dto/update-autore.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { autore } from './entities/autore.entity.js';

@Injectable()
export class AutoresService {
  constructor(private readonly Prisma: PrismaService) {}

  async create(createAutoreDto: CreateAutoreDto) {
    const autorexiste = await this.Prisma.autor.findUnique({
      where: {
        email: createAutoreDto.email
      }
    })
    if(autorexiste){
      throw new ConflictException('este email já esta cadastrado')
    }

    const autor =  await this.Prisma.autor.create({
      data: {...createAutoreDto},
    });
    return autor;
  }

  async findAll() {
    
    const autores: autore[] = await this.Prisma.autor.findMany({
      include: { // o objeto de livros vem junto
        livros: true
      }
    });
    if(!autores.length){
      throw new NotFoundException('não há autores cadastrados')
    }
    return autores;
  }

  async findOne(id: number) {
    const autor = await this.Prisma.autor.findUnique({
      where: {id},
      include: { 
        livros: true
      }
    })
    if(!autor){
      throw new NotFoundException('autor não encontrado')
    }
    return autor;
  }

  async update(id: number, updateAutoreDto: UpdateAutoreDto) {
    const autoreditar = await this.Prisma.autor.findUnique({
      where: {id}
    })
    if(!autoreditar){
      throw new NotFoundException('autor não registrado')
    }
    return this.Prisma.autor.update({
      where: {id},
      data: {...updateAutoreDto}
    })
  }

  async remove(id: number) {
    const autordeletar = await this.Prisma.autor.findUnique({
      where: {id}
    }) 
    if(!autordeletar){
      throw new NotFoundException('autor não encontrado')
    }
    return this.Prisma.autor.delete({
      where: {id}
    })
  }
}
