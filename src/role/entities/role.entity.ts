import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("text")
    type: string
}
