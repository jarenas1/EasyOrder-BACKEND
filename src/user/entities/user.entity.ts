import { Role } from "src/role/entities/role.entity";
import { Table } from "src/tables/entities/table.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("text", {unique:true})
    username: string

    @Column("text")
    name: string

    @Column("text")
    lastname: string

    @Column("text", {unique:true})
    password: string

    @ManyToOne(() => Role, role => role.users, {onDelete: "CASCADE"})
    role: Role;

    @OneToMany(() => Table, table => table.user, { nullable: true})
    tables: Table[]

}
