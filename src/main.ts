import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import "dotenv/config"
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' });
  // documentação swagger
  app.useGlobalPipes(new ValidationPipe())
  // configuração da documentação no swagger
  const config = new DocumentBuilder()
    .setTitle('API de autores e livros')
    .setDescription('APi para gerenciar autores e livros')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000}', 'Servidor Local')
    .addBearerAuth() //necessita de autorização
    .build() // comando de criação da documentação
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document) //comando de iniciar a documentação
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
