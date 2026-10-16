import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {
    signIn: vi.fn(),
    getUser: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forwards signin and user operations to the service', async () => {
    const credentials = { email: 'ana@example.com', password: 'secret' };
    const update = { nome: 'Ana Silva' };
    authService.signIn.mockResolvedValue({ id: 1 });
    authService.getUser.mockResolvedValue({ id: 1 });
    authService.update.mockResolvedValue({ id: 1 });
    authService.remove.mockResolvedValue({ id: 1 });

    await controller.signIn(credentials);
    await controller.user(1);
    await controller.update(1, update);
    await controller.remove(1);

    expect(authService.signIn).toHaveBeenCalledWith(credentials);
    expect(authService.getUser).toHaveBeenCalledWith(1);
    expect(authService.update).toHaveBeenCalledWith(1, update);
    expect(authService.remove).toHaveBeenCalledWith(1);
  });
});
