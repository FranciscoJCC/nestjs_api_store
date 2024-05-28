import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe, para validar inputs en las peticiones con los dtos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Quita elementos del payload cuando no se define en el dto
    forbidNonWhitelisted: true, //Alertamos del error, cuando se agregue información no deseada al payload
    transformOptions: {
      enableImplicitConversion: true //Conversión de tipos de datos en los request, de forma implicita
    }
  }));

  //Documentation of swagger
  const config = new DocumentBuilder()
  .setTitle('Platzi Store')
  .setDescription('The store API description')
  .setVersion('1.0')
  .addTag('store')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  //Enable cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
