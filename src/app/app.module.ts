import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AutoresController } from '../autores/autores.controller.js';
import { AutoresService } from '../autores/autores.service.js';
import { LivrosController } from '../livros/livros.controller.js';
import { LivrosService } from '../livros/livros.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, AutoresController, LivrosController],
  providers: [AppService, AutoresService, LivrosService],
})
export class AppModule {}
