import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Helmet */
  app.use(helmet());

  /* Cors */
  app.enableCors();

  /* Global Validation pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
