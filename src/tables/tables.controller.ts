import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { TableService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableStatusDto } from './dto/update-table-status.dto';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get(':userId')
  getTablesAssignedToUser(@Param('userId') userId: string) {
    return this.tableService.getTablesByUserId(userId);
  }

  @Patch(':tableId/status')
  updateTableStatus(
    @Param('tableId') tableId: string,
    @Body() updateTableStatusDto: UpdateTableStatusDto,
  ) {
    return this.tableService.updateTableStatus(tableId, updateTableStatusDto.status);
  }

  @Post()
  createTable(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }
}
