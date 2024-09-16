import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Table {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("text")
    name: string

    @Column("text")
    status:string


    @ManyToOne(()=> User, user => user.tables, { nullable: true})
    user: User

}
