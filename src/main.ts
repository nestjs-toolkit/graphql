import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');

  Logger.log(
    `🚀 Client application is running on: ${await app.getUrl()}/graphql`,
    'Bootstrap',
  );
}

bootstrap();
