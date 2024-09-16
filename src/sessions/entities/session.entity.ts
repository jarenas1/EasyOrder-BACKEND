/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from '../../tables/entities/table.entity';
import { Request } from 'src/requests/request.entity';

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 75 })
    name: string;

    @Column({ type: 'boolean', default: 0 })
    paid: boolean;

    @ManyToOne(() => Table, (table) => table.session)
    @JoinColumn({ name: 'table_id' })
    table: Table;

    @OneToMany(() => Request, request => request.session)
    requests: Request[];
}
