import { Injectable } from '@nestjs/common';

@Injectable() //injeção de depedencia, o nest automaticamente envia a depadencia para onde ela esta sendo usada, no caso vai ser no controller
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  gethello2(): string {
    return 'Hello World! this is post';
  }
}
