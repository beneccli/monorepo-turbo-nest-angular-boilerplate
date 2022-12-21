import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import * as dotenv from 'dotenv';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RequestIdResponseHeaderInterceptor } from '@src/interceptors/request-id-response-header.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Load environment
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });
  app.enableShutdownHooks();
  app.useGlobalInterceptors(new RequestIdResponseHeaderInterceptor());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Simple CRUD for managing business logic')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
