/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from '../../tables/entities/table.entity';
import { Request } from 'src/requests/request.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sessions')
export class Session {
    
    @ApiProperty({ description: 'ID único de la sesión', example: 'uuid' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Nombre de la sesión', example: 'Sesión 1' })
    @Column({ length: 75 })
    name: string;

    @ApiProperty({ description: 'Estado del pago de la sesión', example: false })
    @Column({ type: 'boolean', default: 0 })
    paid: boolean;

    @ApiProperty({ description: 'Mesa asociada a la sesión' })
    @ManyToOne(() => Table, (table) => table.session)
    @JoinColumn({ name: 'table_id' })
    table: Table;

    @ApiProperty({ description: 'Solicitudes asociadas a la sesión' })
    @OneToMany(() => Request, request => request.session)
    requests: Request[];
}
