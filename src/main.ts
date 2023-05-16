import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true, // Automatically transform incoming payloads to DTO instances
  whitelist: true, // Strip any unknown properties from incoming payloads
  forbidNonWhitelisted: true, // Throw an error if unknown properties are present in the payload
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(3000);
}
bootstrap();
