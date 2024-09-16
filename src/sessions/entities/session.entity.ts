/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from '../../tables/entities/table.entity';

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 75 })
    name: string;

    @Column({ type: 'boolean', default: 0 })
    paid: boolean;

    @ManyToOne(() => Table, (table) => table.session)
    table: Table;
}
