import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestDto } from './dto/request.dto';
import { Request } from './request.entity';
import { RequestUpdateDto } from './dto/request-update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('requests')
@Controller('requests')
export class RequestsController {

    constructor(private readonly  requestService: RequestsService) {}

    @Post()
    @ApiOperation({summary: 'Create a new request'})//swagger
    @ApiResponse({status: 200, description: 'New request has been created'})
    @ApiResponse({status: 404, description: 'Product or Session had not been found'})
    async createRequest(@Body() request: RequestDto) {
        return this.requestService.createRequest(request);
    }

    @Get()
    @ApiOperation({summary: 'Get all request'})
    @ApiResponse({status: 200, description: 'All requests'})
    getRequests(): Promise<Request[]> {
        return this.requestService.getRequests();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get a request by id'})
    @ApiResponse({status: 200, description: 'Request found'})
    @ApiResponse({status: 404, description: 'Request had not been found'})
    getRequestById(@Param('id', ParseUUIDPipe) id: string) {
        return this.requestService.getRequestById(id);
    }

    //Endpoint para que los meseros actualicen el estado
    @Patch(':id/status')
    @ApiOperation({summary: 'Update request status'})
    @ApiResponse({status: 200, description: 'status has been updated'})
    @ApiResponse({status: 404, description: 'Request had not been found'})
    async updateRequestStatus(@Param('id') id: string, @Body() updateRequestDto: RequestUpdateDto) {
        return this.requestService.updateRequestStatus(id, updateRequestDto);
    }
}
