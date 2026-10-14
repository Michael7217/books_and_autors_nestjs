import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('UsersService', () => {
  let service: UsersService;
  const prisma = {
    users: {
      findUnique: vi.fn(),
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
    expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('throws when the user does not exist', async () => {
    prisma.users.findUnique.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('returns an existing user by email', async () => {
    const user = { id: 1, email: 'user@example.com' };
    prisma.users.findUnique.mockResolvedValue(user);

    await expect(service.findByEmail(user.email)).resolves.toEqual(user);
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { email: user.email },
    });
  });
});
