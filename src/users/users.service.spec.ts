import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UsersService', () => {
  let service: UsersService;
  const prisma = {
    users: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns an existing user by id', async () => {
    const user = { id: 1, email: 'user@example.com' };
    prisma.users.findUnique.mockResolvedValue(user);

    await expect(service.findOne(1)).resolves.toEqual(user);
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: { id: true, nome: true, email: true },
    });
  });

  it('throws when the user does not exist', async () => {
    prisma.users.findUnique.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('returns a user by email without exposing the password', async () => {
    const user = { id: 1, email: 'user@example.com' };
    prisma.users.findUnique.mockResolvedValue(user);

    await expect(service.findByEmail(user.email)).resolves.toEqual(user);
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { email: user.email },
      select: { id: true, nome: true, email: true },
    });
  });

  it('finds matching credentials while selecting only public fields', async () => {
    prisma.users.findUnique.mockResolvedValue({
      id: 1,
      nome: 'User',
      email: 'user@example.com',
    });

    await service.findByCredentials('user@example.com', 'secret');

    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { email: 'user@example.com', password: 'secret' },
      select: { id: true, nome: true, email: true },
    });
  });
});
