import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestDto } from './dto/request.dto';
import { Request } from './request.entity';

@Controller('requests')
export class RequestsController {

    constructor(private readonly  requestService: RequestsService) {}

    @Post()
    async createRequest(@Body() request: RequestDto) {
        return this.requestService.createRequest(request);
    }

    @Get()
    getRequests(): Promise<Request[]> {
        return this.requestService.getRequests();
    }
}
