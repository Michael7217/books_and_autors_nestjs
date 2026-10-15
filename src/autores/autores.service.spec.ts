import { Test, TestingModule } from '@nestjs/testing';
import { AutoresService } from './autores.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('AutoresService', () => {
  let service: AutoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoresService, {
        provide: PrismaService,
        useValue: {}
      }],
    }).compile();

    service = module.get<AutoresService>(AutoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
