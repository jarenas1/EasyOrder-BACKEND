// src/tables/tables.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { TableGateway } from './websocket.gateway';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
    private readonly tableGateway: TableGateway,
  ) {}

  async getTablesByUserId(userId: string): Promise<Table[]> {
    return this.tableRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateTableStatus(tableId: string, status: string): Promise<Table> {
    const table = await this.tableRepository.findOneBy({ id: tableId });
    if (!table) {
      throw new Error('Table not found');
    }
    table.status = status;
    await this.tableRepository.save(table);

    // Emitir la actualización en tiempo real
    this.tableGateway.updateTableStatus(tableId, status);

    return table;
  }

  async createTable(createTableDto: CreateTableDto): Promise<Table> {
    const newTable = this.tableRepository.create(createTableDto);
    return await this.tableRepository.save(newTable);
  }
}
