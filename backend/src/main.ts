import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Ohrbuehl-API')
      .setDescription('Ohrbuehl Web Interface')
      .setVersion('1.0')
      .addTag('ohrbuehl-web')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  process.env.TZ = configService.get('timeZone');
  await app.listen(configService.get('port'));
}

bootstrap();
