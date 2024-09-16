import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"

@Entity('tables')
export class Table {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20})
    name: string;

    @Column({type: 'varchar', length: 50})
    status: string;

    @ManyToOne(() => User, (user) => user.tables)
    @JoinColumn({ name: 'users_id' })
    user: User;

    @OneToMany(() => Session, (session) => session.table)
    session: Session[];
}

