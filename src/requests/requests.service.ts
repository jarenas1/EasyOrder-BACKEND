import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Repository } from 'typeorm';
import { RequestsGateway } from './requests.gateway';
import { RequestDto } from './dto/request.dto';
import { ProductsService } from 'src/products/products.service';
import { RequestUpdateDto } from './dto/request-update.dto';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request) private requestRepository: Repository<Request>,
        private requestGateway: RequestsGateway,
        private productService: ProductsService,
        private sessionService: SessionsService,
    ) { }

    async createRequest(request: RequestDto) {
        //Aquí debo buscar las FK para poder crear la solicitud
        const productFound = await this.productService.getProductById(request.productId);
        const sessionFound = await this.sessionService.getSessionById(request.sessionId);

        if (!productFound) {
            return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
        } else if (!sessionFound) {
            return new HttpException('Sesión no encontrada', HttpStatus.NOT_FOUND);
        }
        const newRequest = this.requestRepository.create(
            {
                ...request,
                product: productFound,// es esta relación product: Product que esta en el request.entity.ts
                session: sessionFound, // es esta relación session: Session que esta en el request.entity.ts
                status: 'Recibido', //Este me lo tira por defecto
            }
        );

        await this.requestRepository.save(newRequest);

        //Aquí les tiro la solicitud a los meseros en el servidor por medio del evento websocket
        this.requestGateway.sendRequest(newRequest)
        return newRequest;
    }

    getRequests() {
        return this.requestRepository.find({
            relations: ['product']//Así se llama en la entidad y es para que nos traiga la información
        });
    }

    //Vamos a meterle el método para que el mesero actualice el estado
    async updateRequestStatus(id: string, updateRequestDto: RequestUpdateDto) {
        //Voy a desectructurar para traerme solo el campo de status del dto
        // const status = updateRequestDto.status;
        const { status } = updateRequestDto;
        //Aquí buscamos la solicitud
        const requestFound = await this.requestRepository.findOne({
            where: {
                id
            },
            relations: ['product']//le incluimos la relación de la entidad de product
        });

        if (!requestFound) {
            return new HttpException(`Solicitud no encontrada: ${id}`, HttpStatus.NOT_FOUND);
        }

        //Aquí actualizamos el estado { status }
        requestFound.status = status; 

        const updatedRequest = await this.requestRepository.save(requestFound);
        this.requestGateway.notifyRequestStatusChange(updatedRequest)
        return updatedRequest;
    }

    async getRequestById(id: string) {
        const requestFound = await this.requestRepository.findOne({
            where: {
                id
            },
            relations: ['product', 'session']//le incluimos la relación de la entidad de product
        });

        if (!requestFound) {
            return new HttpException(`Solicitud no encontrada: ${id}`, HttpStatus.NOT_FOUND);
        }
        return requestFound;
    }
}
