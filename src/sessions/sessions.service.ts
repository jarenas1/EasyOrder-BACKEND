/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { Table } from '../tables/entities/table.entity';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { RolesEnum } from 'src/common/enums';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>, // repositorio de sessions

    @InjectRepository(Table)
    private readonly tablesRepository: Repository<Table>,  // repositorio de tables
  ) {}

  @RoleDecorator(RolesEnum.mesero)
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    try {
      // Buscar la tabla relacionada por ID
      const table = await this.tablesRepository.findOne({
        where: { id: createSessionDto.table_id },
      });

      if (!table) {
        throw new NotFoundException(`Table with ID ${createSessionDto.table_id} not found`);
      }

      const session = this.sessionsRepository.create({
        name: createSessionDto.name,
        paid: false, 
        table: table, 
      });

      return await this.sessionsRepository.save(session);
    } catch (error) {
      console.error('Error al crear la sesión:', error);  // Logging adicional
      throw new InternalServerErrorException('Failed to create session', error.message);
    }
  }

  @RoleDecorator(RolesEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<Session[]> {
    try {
      return await this.sessionsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve sessions', error.message);
    }
  }


  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findUnpaid(): Promise<Session[]> {
    try {
      const unpaidSessions = await this.sessionsRepository.find({ where: { paid: false } });
      if (unpaidSessions.length === 0) {
        throw new NotFoundException('No unpaid sessions found');
      }
      return unpaidSessions;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve unpaid sessions', error.message);
    }
  }

  @RoleDecorator(RolesEnum.mesero)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updatePaid(id: string, paid: boolean): Promise<Session> {
    try {
      const session = await this.sessionsRepository.findOneBy({ id });

      if (!session) {
        throw new NotFoundException(`Session with ID ${id} not found`);
      }

      session.paid = paid;
      return await this.sessionsRepository.save(session);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update session ${id}`, error.message);
    }
  }

  //To Do
  async getSessionById(id: string) {
    const sessionFound = await this.sessionsRepository.findOne({
        where: {
            id
        },
        relations: ['requests']//le incluimos la relación de la entidad de request
    });

    if (!sessionFound) {
        return new HttpException(`Solicitud no encontrada: ${id}`, HttpStatus.NOT_FOUND);
    }
    return sessionFound;
}
}
