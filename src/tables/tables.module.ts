import { Module } from '@nestjs/common';
import { TableService } from './tables.service';
import { TableController } from './tables.controller';
import { Table } from './entities/table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableGateway } from './websocket.gateway';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  controllers: [TableController],
  providers: [TableService, TableGateway],
  imports: [TypeOrmModule.forFeature([Table]), SessionsModule]
})
export class TablesModule {}
