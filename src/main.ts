import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NEST BACKEND')
    .setDescription('NEST BACKEND')
    .setVersion('1.0.0')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   AuthorizationHeader.BEARER,
    // )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      syntaxHighlight: { activated: false },
    },
    explorer: false,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
