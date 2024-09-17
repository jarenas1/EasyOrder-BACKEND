import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('tables')
export class Table {
    @ApiProperty({ description: 'El identificador único de la mesa', example: 'uuid' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'El nombre de la mesa', example: 'Mesa de esquina' })
    @Column({type: 'varchar', length: 20})
    name: string;

    @ApiProperty({ description: 'El estado actual de la mesa', example: 'disponible' })
    @Column({type: 'varchar', length: 50})
    status: string;

    @ApiProperty({ description: 'El usuario asignado a la mesa' })
    @ManyToOne(() => User, (user) => user.tables)
    @JoinColumn({ name: 'users_id' })
    user: User;

    @ApiProperty({ description: 'Las sesiones asociadas a la mesa' })
    @OneToMany(() => Session, (session) => session.table)
    session: Session[];
}
