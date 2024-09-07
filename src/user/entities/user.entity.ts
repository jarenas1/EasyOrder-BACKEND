import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("text", {})
    username: string

    @Column("text")
    name: string

    @Column("text")
    lastname: string

    @Column("text")
    password: string
}
