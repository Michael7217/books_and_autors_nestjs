import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  Criarmembros() {
    
  }

  @Get('/post')
  postHello(): string {
    return this.appService.gethello2();
  }
}
