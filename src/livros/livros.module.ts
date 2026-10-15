import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service.js';
import { LivrosController } from './livros.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
