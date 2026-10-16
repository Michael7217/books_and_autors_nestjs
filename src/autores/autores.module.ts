import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { AutoresController } from './autores.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
