import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestDto } from './dto/request.dto';
import { Request } from './request.entity';
import { RequestUpdateDto } from './dto/request-update.dto';

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

    @Get(':id')
    getRequestById(@Param('id', ParseIntPipe) id: number) {
        return this.requestService.getRequestById(id);
    }

    //Endpoint para que los meseros actualicen el estado
    @Patch(':id/status')
    async updateRequestStatus(@Param('id') id: number, @Body() updateRequestDto: RequestUpdateDto) {
        return this.requestService.updateRequestStatus(id, updateRequestDto);
    }
}
