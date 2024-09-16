/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Param, Body, UseGuards, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { UpdateSessionDto } from './dto/update-session.dto';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { RolesEnum } from 'src/common/enums';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    create (session: CreateSessionDto) {
      return this.sessionsService.create(session);
    }


    @RoleDecorator(RolesEnum.mesero)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
