/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { Table } from '../tables/entities/table.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>, // repositorio de sessions

    @InjectRepository(Table)
    private readonly tablesRepository: Repository<Table>,  // repositorio de tables
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    // Buscar la tabla relacionada por ID
    const table = await this.tablesRepository.findOneBy({
      id: createSessionDto.tableId,
    });
  
    if (!table) {
      throw new NotFoundException('Table not found');
    }
  
    const session = this.sessionsRepository.create({
      idSolicitud: createSessionDto.idSolicitud,
      name: createSessionDto.name,
      paid: false, // paid por defecto en false
      table: table,  // Asignar la entidad de tabla completa
    });
  
    return this.sessionsRepository.save(session);
  }
  

  async findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  async findUnpaid(): Promise<Session[]> {
    return this.sessionsRepository.find({ where: { paid: false } });
  }

  async updatePaid(idSolicitud: string, paid: boolean): Promise<Session> {
    const session = await this.sessionsRepository.findOneBy({ idSolicitud });
    if (!session) throw new NotFoundException('Session not found');

    session.paid = paid;
    return this.sessionsRepository.save(session);
  }
}
