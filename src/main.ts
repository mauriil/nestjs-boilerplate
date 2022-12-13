import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { MyLogger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(helmet({ contentSecurityPolicy: false}));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
  .setTitle('Virtual Trainer API Documentation')
  .setDescription('The Virtual Trainer API endpoints and examples.')
  .setVersion('1.0')
  .addTag('users')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT);
  const logger = new MyLogger;
  logger.log(`Server running on port ${process.env.APP_PORT}`, 'Main');
}
bootstrap();
