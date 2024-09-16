import { Product } from "src/products/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    sessionsId: number;

    @Column({ default: 'Recibido'})//Se le pone ese estado por defecto
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    creationDate: Date;

    @ManyToOne(() => Product, product => product.requests)
    @JoinColumn({ name: 'productId' })
    product: Product;
}