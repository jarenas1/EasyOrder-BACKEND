import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { TableService } from './tables.service';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get(':userId')
  getTablesAssignedToUser(@Param('userId') userId: string) {
    return this.tableService.getTablesByUserId(userId);
  }

  @Patch(':tableId/status')
  updateTableStatus(@Param('tableId') tableId: string, @Body('status') status: string) {
    return this.tableService.updateTableStatus(tableId, status);
  }
}
