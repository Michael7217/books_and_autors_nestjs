import { Test, TestingModule } from '@nestjs/testing';
import { AutoresController } from './autores.controller.js';
import { AutoresService } from './autores.service.js';

describe('AutoresController', () => {
  let controller: AutoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoresController],
      providers: [{
        provide: AutoresService,
        useValue: {},
      }],
    }).compile();

    controller = module.get<AutoresController>(AutoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
