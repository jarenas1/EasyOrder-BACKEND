/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Param, Body, UseGuards, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { UpdateSessionDto } from './dto/update-session.dto';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { RolesEnum } from 'src/common/enums';
import { CreateSessionDto } from './dto/create-session.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Sessions')
@ApiBearerAuth() // Para JWT auth en Swagger
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiOperation({ summary: 'Crear una nueva sesión' })
  @ApiResponse({ status: 201, description: 'Sesión creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() session: CreateSessionDto) {
    return this.sessionsService.create(session);
  }

  @ApiOperation({ summary: 'Obtener todas las sesiones' })
  @ApiResponse({ status: 200, description: 'Lista de todas las sesiones.' })
  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener sesiones no pagadas' })
  @ApiResponse({ status: 200, description: 'Lista de sesiones no pagadas.' })
  @ApiResponse({ status: 404, description: 'No se encontraron sesiones no pagadas.' })
  @Get('unpaid')
  findUnpaid() {
    return this.sessionsService.findUnpaid();
  }

  @ApiOperation({ summary: 'Actualizar el estado de pago de una sesión' })
  @ApiResponse({ status: 200, description: 'Estado de la sesión actualizado.' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada.' })
  @Patch(':id/paid')
  async updatePaid(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.updatePaid(id, updateSessionDto.paid);
  }
}
