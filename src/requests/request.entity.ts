import { Product } from "src/products/product.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    quantity: number;

    @Column()
    sessionId: string;

    @Column({ default: 'Recibido'})//Se le pone ese estado por defecto
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    creationDate: Date;

    @ManyToOne(() => Product, product => product.requests)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne(() => Session, session => session.requests)
    @JoinColumn({ name: 'sessionId' })
    session: Session;
}