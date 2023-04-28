import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Nest API')
  .setDescription('Coffe Management API')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/',app, document)
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Coffee Management API')
    .setDescription(
      'API provides many endpoints for Coffee App',
    )
    .addBearerAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer', 
        scheme: 'Bearer',
        type: 'http', 
        in: 'Header'
      },
      'jwt',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });
  
  app.use(helmet());

  await app.listen(process.env.PORT ?? 4000);
  app.setGlobalPrefix('api');
}
bootstrap();
