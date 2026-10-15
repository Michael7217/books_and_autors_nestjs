import { Test, TestingModule } from '@nestjs/testing';
import { LivrosService } from './livros.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('LivrosService', () => {
  let service: LivrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrosService, {
        provide: PrismaService,
        useValue: {}
      }],
    }).compile();

    service = module.get<LivrosService>(LivrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
