import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { SkincareProduct } from "./SkincareProduct";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    orderDetailId: number;

    @ManyToOne(() => Order, order => order.orderId)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => SkincareProduct, product => product.productId)
    @JoinColumn({ name: 'product_id' })
    product: SkincareProduct;

    @Column()
    quantity: number;
}
