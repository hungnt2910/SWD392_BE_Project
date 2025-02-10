import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SkincareProduct } from "./SkincareProduct";

@Entity()
export class SkincareProductDetails{
    @PrimaryGeneratedColumn()
    productDetailsId: number;

    @ManyToOne(() => SkincareProduct, product => product.productId)
    @JoinColumn({ name: 'product_id' })
    product: SkincareProduct;

    @Column()
    productionDate: string;

    @Column()
    expirationDate: string;

    @Column()
    quantity: number;
}