import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import "dotenv/config"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
