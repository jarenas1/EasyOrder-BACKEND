import { Request } from "src/requests/request.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @Column()
    price: number;

    @OneToMany(() => Request, request => request.product)
    requests: Request;
}