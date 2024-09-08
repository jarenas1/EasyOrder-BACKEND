import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("orderStatus")
export class OrderStatus {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("text")
    name: string

}
