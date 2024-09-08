import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}
  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string) {
    this.orderStatusService.delete(id)
  }
}
