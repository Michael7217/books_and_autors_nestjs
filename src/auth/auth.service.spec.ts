import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = {
    findByCredentials: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signs in with valid credentials and returns public user data', async () => {
    const user = { id: 1, nome: 'Ana', email: 'ana@example.com' };
    usersService.findByCredentials.mockResolvedValue(user);

    await expect(
      service.signIn({ email: user.email, password: 'secret' }),
    ).resolves.toEqual(user);
    expect(usersService.findByCredentials).toHaveBeenCalledWith(
      user.email,
      'secret',
    );
  });

  it('rejects invalid credentials', async () => {
    usersService.findByCredentials.mockResolvedValue(null);

    await expect(
      service.signIn({ email: 'ana@example.com', password: 'wrong' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('delegates user lookup, update, and delete', async () => {
    const user = { id: 1, nome: 'Ana', email: 'ana@example.com' };
    const update = { nome: 'Ana Silva' };
    usersService.findOne.mockResolvedValue(user);
    usersService.update.mockResolvedValue(user);
    usersService.remove.mockResolvedValue(user);

    await expect(service.getUser(1)).resolves.toEqual(user);
    await expect(service.update(1, update)).resolves.toEqual(user);
    await expect(service.remove(1)).resolves.toEqual(user);
    expect(usersService.findOne).toHaveBeenCalledWith(1);
    expect(usersService.update).toHaveBeenCalledWith(1, update);
    expect(usersService.remove).toHaveBeenCalledWith(1);
  });
});
