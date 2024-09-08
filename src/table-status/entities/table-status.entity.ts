import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tableStatus")
export class TableStatus {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("text")
    name: string
}
