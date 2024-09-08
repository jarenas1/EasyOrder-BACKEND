import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableStatusService } from './table-status.service';

@Controller('table-status')
export class TableStatusController {
  constructor(private readonly tableStatusService: TableStatusService) {}

  @Get()
  findAll() {
    return this.tableStatusService.findAll();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tableStatusService.remove(+id);
  // }
}
