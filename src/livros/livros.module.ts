import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service.js';
import { LivrosController } from './livros.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  imports: [PrismaService],
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
