import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './logger/logger.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true 
  }))
  await app.listen(3333);
}
bootstrap();
