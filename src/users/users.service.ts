import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly Prisma: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    const userexiste = await this.Prisma.users.findUnique({
      where: {
        email: createUserDto.email
      }
    })
    if(userexiste){
      throw new ConflictException('usuario já cadastrado')
    }
    
    return await this.Prisma.users.create({
      data: createUserDto
    })
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.Prisma.users.findUnique({
      where: { id }
    })

    if (!user) {
      throw new NotFoundException('usuario não encontrado')
    }

    return user
  }

  async findByEmail(usersWhereUniqueInput: Prisma.usersWhereUniqueInput ) {
    const user = await this.Prisma.users.findUnique({
      where: {
        email: usersWhereUniqueInput.email
    }})

    if (!user) {
      throw new NotFoundException('usuario não encontrado')
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.Prisma.users.findUnique({
      where: {id}
  })
  if (!user) {
      throw new NotFoundException('usuario não encontrado')
    }

    return await this.Prisma.users.update({
      where: {id},
      data: updateUserDto
    })
  }

  async remove(id: number) {
    const userexiste = await this.Prisma.users.findUnique({
      where: {id}
    })
    if(!userexiste){
      throw new NotFoundException("usuario não encontrado")
    }
    return await this.Prisma.users.delete({
      where: {id}
    })
  }
}
