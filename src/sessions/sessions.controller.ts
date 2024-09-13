/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Get()
    findAll() {
      return this.sessionsService.findAll();
    }

    @Get('unpaid')
    findUnpaid() {
      return this.sessionsService.findUnpaid();
    }

    @Patch(':id/paid')
    updatePaid(
      @Param('id') id: string,
      @Body() updateSessionDto: UpdateSessionDto,
    ) {
      return this.sessionsService.updatePaid(id, updateSessionDto.paid);
    }
}
