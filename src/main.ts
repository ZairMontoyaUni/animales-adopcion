import { NestFactory }                  from '@nestjs/core';
import { ValidationPipe, Logger }       from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule }                    from './app.module';

async function bootstrap() {
  const app    = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.use((req, res, next) => {
    logger.log(`${req.method} ${req.originalUrl ?? req.url}`);
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:            true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Adopción de Animales')
    .setDescription('API para la gestión de adopción de animales')
    .setVersion('1.0')
    .addBearerAuth() 
    .addServer('http://localhost:3000', 'Local')
    .addServer('https://api.miapp.com',  'Producción')
    .addTag('animals', 'Endpoints para gestionar animales')
    .addTag('locations', 'Endpoints para gestionar ubicaciones')
    .addTag('users', 'Endpoints para gestionar usuarios')
    .addTag('favorites', 'Endpoints para gestionar favoritos')
    .addTag('seeder', 'Endpoints para poblar la base de datos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Servidor en http://localhost:${port}/api`);
  logger.log(`Swagger en http://localhost:${port}/api/docs`);
}
bootstrap();