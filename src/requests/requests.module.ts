import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestsGateway } from './requests.gateway';
import { ProductsModule } from 'src/products/products.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { WebsocketinfoController } from './websocketinfo/websocketinfo.controller';

@Module({
  providers: [RequestsService, RequestsGateway],
  controllers: [RequestsController, WebsocketinfoController],
  imports: [TypeOrmModule.forFeature([Request]), ProductsModule, SessionsModule] //Aquí importaría los módulos de lo que vaya a utilizar
})
export class RequestsModule {}
