import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Repository } from 'typeorm';
import { RequestsGateway } from './requests.gateway';
import { RequestDto } from './dto/request.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request) private requestRepository: Repository<Request>,
        private requestGateway: RequestsGateway,
        private productService: ProductsService
        // private sessionService: SessionsService,
    ) { }

    async createRequest(request: RequestDto) {
        //Aquí debo buscar las FK para poder crear la solicitud
        const productFound = await this.productService.getProductById(request.productId);
        
        if (!productFound) {
            return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
        }
        const newRequest = this.requestRepository.create(
            {
                ...request,
                product: productFound,// es esta relación product: Product que esta en el request.entity.ts
                status: 'Recibido', //Este me lo tira por defecto
            }
        );
    
        await this.requestRepository.save(newRequest);

        //Aquí les tiro la solicitud a los meseros en el servidor por medio del evento websocket
        this.requestGateway.sendRequest(newRequest)
        return newRequest;
    }

    getRequests () {
        return this.requestRepository.find({
            relations: ['product']//Así se llama en la entidad y es para que nos traiga la información
        });
    }
}
