/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Table } from '../../tables/entities/table.entity';

@Entity('sessions')
export class Session {
    @PrimaryColumn({ length: 200 })
    idSolicitud: string;

    @Column({ length: 75 })
    name: string;

    @Column({ type: 'tinyint', default: 0 })
    paid: boolean;

    @ManyToOne(() => Table, (table) => table.session)
    table: Table;
}
