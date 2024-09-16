import { Controller, Get, Param, Patch, Body, Post, UseGuards, Delete } from '@nestjs/common';
import { TableService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableStatusDto } from './dto/update-table.dto';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { RolesEnum } from 'src/common/enums';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllTables() {
    return this.tableService.getAllTables();
  }

  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':userId')
  getTablesAssignedToUser(@Param('userId') userId: string) {
    return this.tableService.getTablesByUserId(userId);
  }

  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':tableId/status')
  updateTableStatus(
    @Param('tableId') tableId: string,
    @Body() updateTableStatusDto: UpdateTableStatusDto,
  ) {
    return this.tableService.updateTableStatus(tableId, updateTableStatusDto.status);
  }

  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createTable(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }

  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':tableId')
  deleteTable(@Param('tableId') tableId: string) {
    return this.tableService.deleteTable(tableId);
}
}