import { Test, TestingModule } from '@nestjs/testing';
import { LivrosController } from './livros.controller.js';
import { LivrosService } from './livros.service.js';

describe('LivrosController', () => {
  let controller: LivrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrosController],
      providers: [{
        provide: LivrosService,
        useValue: {}
      }],
    }).compile();

    controller = module.get<LivrosController>(LivrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
