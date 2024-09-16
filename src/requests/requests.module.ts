import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestsGateway } from './requests.gateway';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [RequestsService, RequestsGateway],
  controllers: [RequestsController],
  imports: [TypeOrmModule.forFeature([Request]), ProductsModule] //Aquí importaría los módulos de lo que vaya a utilizar
})
export class RequestsModule {}
