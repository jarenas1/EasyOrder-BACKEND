import { Injectable } from '@nestjs/common';
import { CreateTableStatusDto } from './dto/create-table-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TableStatus } from './entities/table-status.entity';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class TableStatusService {
  constructor(@InjectRepository(TableStatus) private readonly tableStatusRepository: Repository<TableStatus>) {
  }

  async createSeed(createTableStatusDto: CreateTableStatusDto[]) {
    for(const tableStatus of createTableStatusDto) {
      const found = await this.findOne(tableStatus.name);
      
      if (!found) {
        const newStatus = this.tableStatusRepository.create(tableStatus)
        await this.tableStatusRepository.save(newStatus)
      } else {
        return false
      }
    }
    return this.findAll()
  }

  async findAll(): Promise<TableStatus[]> {
    return await this.tableStatusRepository.find()
  }

  async findOne(name: string): Promise<TableStatus> {
    return await this.tableStatusRepository.findOneBy({name})
  }

}
