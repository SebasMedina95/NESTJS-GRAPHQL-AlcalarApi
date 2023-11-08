import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap')

  //? Alias de la aplicación
  app.setGlobalPrefix('api-alcalarvite/v1');

  //? Configuración Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  //? Configuración del cors
  app.enableCors();

  //? Configuración de puerto
  await app.listen( process.env.PORT );
  logger.log(`La APP está corriendo en puerto ${process.env.PORT}`);

}
bootstrap();
