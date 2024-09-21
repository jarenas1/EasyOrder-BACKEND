import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: '*'
  })
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  app.setGlobalPrefix("api/v1")

  const config = new DocumentBuilder()
    .setTitle('Easy Order')
    .setDescription(`
    Esta API usa WebSockets para las notificaciones en tiempo real sobre el estado de las solicitudes. 
    Para conectarse al WebSocket, use el siguiente esquema:

    - URL de WebSocket: ws://{HOST}:{PORT}
    - Eventos disponibles:
      - client-joined: Notifica cuando un nuevo cliente se conecta.
      - client-disconnected: Notifica cuando un cliente se desconecta.
      - new-request: Notifica cuando se crea una nueva solicitud.
      - request-status-change: Notifica cuando cambia el estado de una solicitud.
  `)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<string>("PORT"));
}
bootstrap();
