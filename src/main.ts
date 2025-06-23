import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCors, {
    origin: process.env.FRONTEND_HOST_NAME,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  await app.register(fastifyCookie);

  await app.listen(3000);
}
bootstrap();
