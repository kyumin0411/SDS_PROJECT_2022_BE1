import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pakage from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilder = new DocumentBuilder()
    .setTitle(pakage.name)
    .setDescription(pakage.description)
    .setVersion(pakage.version)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
