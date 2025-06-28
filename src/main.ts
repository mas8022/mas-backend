import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  await fastifyAdapter.register(fastifyCookie, {
    secret: 'my-secret',
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.enableCors({
    origin: process.env.FRONTEND_HOST_NAME,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log(`hey MAS server run on port ${process.env.PORT}`);
  });
}
bootstrap();
