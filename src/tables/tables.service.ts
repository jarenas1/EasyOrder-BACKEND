// src/tables/tables.service.ts
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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

  async getAllTables(): Promise<Table[]> {
    try {
      return await this.tableRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving tables:', error);
    }
  }

  async getTablesByUserId(userId: string): Promise<Table[]> {
    try {
      const tables = await this.tableRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!tables || tables.length === 0) {
        throw new NotFoundException(`No tables found for user with id ${userId}`);
      }

      return tables;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving tables for the user:', error);
    }
  }

  async updateTableStatus(tableId: string, status: string): Promise<Table> {
    if (!status) {
      throw new BadRequestException('Status cannot be empty');
    }

    try {
      const table = await this.tableRepository.findOneBy({ id: tableId });
      if (!table) {
        throw new NotFoundException(`Table with id ${tableId} not found`);
      }

      table.status = status;
      await this.tableRepository.save(table);

      // Emitir la actualización en tiempo real
      this.tableGateway.updateTableStatus(tableId, status);

      return table;
    } catch (error) {
      throw new InternalServerErrorException('Error updating table status:', error);
    }
  }

  async createTable(createTableDto: CreateTableDto): Promise<Table> {
    if (!createTableDto.name || !createTableDto.status) {
      throw new BadRequestException('Table name and status are required');
    }

    try {
      const newTable = this.tableRepository.create(createTableDto);
      return await this.tableRepository.save(newTable);
    } catch (error) {
      throw new InternalServerErrorException('Error creating table:', error);
    }
  }

  async deleteTable(tableId: string): Promise<void> {
    try {
      const result = await this.tableRepository.delete({ id: tableId });
      if (result.affected === 0) {
        throw new NotFoundException(`Table with id ${tableId} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting table:', error);
    }
  }
}
