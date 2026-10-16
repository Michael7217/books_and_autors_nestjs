import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { UsersService } from '../users/users.service.js';

import { Prisma } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginauthDto } from './dto/login-auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly JwtService: JwtService,
  ) {}
  async signup(createAuthDto: CreateAuthDto){
    const user = await this.usersService.User({ email: createAuthDto.email });
    if (user) {
      throw new ConflictException('email já cadastrado');
    }
    return await this.usersService.CreateUser(createAuthDto)
  }
  async signIn(LoginauthDto: LoginauthDto) {
    const user = await this.usersService.User({ email: LoginauthDto.email });
    if (!user) {
      throw new NotFoundException('usuario não cadastrado');
    }
    const passwordmatch = await bcrypt.compare(LoginauthDto.password, user.password);
    if (!passwordmatch) {
      throw new UnauthorizedException('credenciais inválidas');
    }
    const payload = {
      sub: user.id,
    };

    return { access_token: await this.JwtService.signAsync(payload) };
  }

  // async login(LoginauthDto: LoginauthDto) {
  //   const user = await this.usersService.findByEmail(LoginauthDto.email)
  //   const senhavalida = await this.usersService.findOne(user)
  //   if (!user) {
  //     throw new UnauthorizedException('email não cadastrado');
  //   }
  //   return
  // }
  // getUser(id: number) {
  //   return this.usersService.findOne(id);
  // }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.usersService.UpdateUser({
      where: { id },
      data: { ...updateAuthDto },
    });
  }

  remove(id: number) {
    return this.usersService.RemoveUser(id);
  }
}
