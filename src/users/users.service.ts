import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateUser(createUserDto: CreateUserDto) {
    const passwordhash = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.users.create({
      data: { ...createUserDto, password: passwordhash },
      select: { id: true, nome: true, email: true },
    });
  }

  async User(UserwhereUniqueinput: Prisma.usersWhereUniqueInput) {
    const user = await this.prisma.users.findUnique({
      where: UserwhereUniqueinput,
    });
    return user;
  }

  async UpdateUser(params: {where: Prisma.usersWhereUniqueInput, data: Prisma.usersUpdateInput}) {
    
    

    return this.prisma.users.update({
      where: params.where,
      data: params.data,
      select: { id: true, nome: true, email: true },
    });
  }

  async RemoveUser(id: number) {
    const userexiste = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!userexiste) {
      throw new NotFoundException('usuario não encontrado');
    }

    return this.prisma.users.delete({
      where: { id },
      select: { id: true, nome: true, email: true },
    });
  }
}
