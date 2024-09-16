import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("text")
    type: string

    @OneToMany(() => User, user => user.role, {onDelete: "CASCADE"})
    users: User[]
}
