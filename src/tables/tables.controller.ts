import { Controller, Get, Param, Patch, Body, Post, UseGuards, Delete } from '@nestjs/common';
import { TableService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableStatusDto } from './dto/update-table.dto';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { RolesEnum } from 'src/common/enums';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tables')
@ApiBearerAuth() // Para JWT auth en Swagger
@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) { }

  @ApiOperation({ summary: 'Obtener todas las mesas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las mesas.' })
  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllTables() {
    return this.tableService.getAllTables();
  }

  @ApiOperation({ summary: 'Obtener mesas asignadas a un usuario' })
  @ApiResponse({ status: 200, description: 'Mesas asignadas al usuario.' })
  @ApiResponse({ status: 404, description: 'No se encontraron mesas para el usuario.' })
  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':userId')
  getTablesAssignedToUser(@Param('userId') userId: string) {
    return this.tableService.getTablesByUserId(userId);
  }

  @ApiOperation({ summary: 'Actualizar el estado de una mesa' })
  @ApiResponse({ status: 200, description: 'El estado de la mesa ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada.' })
  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':tableId/status')
  updateTableStatus(
    @Param('tableId') tableId: string,
    @Body() updateTableStatusDto: UpdateTableStatusDto,
  ) {
    return this.tableService.updateTableStatus(tableId, updateTableStatusDto.status);
  }

  @ApiOperation({ summary: 'Crear una nueva mesa' })
  @ApiResponse({ status: 201, description: 'Mesa creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createTable(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }

  @ApiOperation({ summary: 'Eliminar una mesa' })
  @ApiResponse({ status: 200, description: 'Mesa eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada.' })
  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':tableId')
  deleteTable(@Param('tableId') tableId: string) {
    return this.tableService.deleteTable(tableId);
  }
}
