import { NestFactory }                  from '@nestjs/core';
import { ValidationPipe, Logger }       from '@nestjs/common';
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

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Servidor en http://localhost:${port}/api`);
}
bootstrap();