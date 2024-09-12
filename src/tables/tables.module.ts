import { Module } from '@nestjs/common';
import { TableService } from './tables.service';
import { TableController } from './tables.controller';

@Module({
  controllers: [TableController],
  providers: [TableService],
})
export class TablesModule {}
