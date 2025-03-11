import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { CareRouteDetail } from "./CareRouteDetail";

@Entity()
export class CareRoute {
    @PrimaryGeneratedColumn()
    careRouteId: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    customer: User;

    @Column()
    staffId: number;

    @Column()
    routeName: string;

    @Column("text")
    description: string;

    @OneToMany(() => CareRouteDetail, detail => detail.route)
    details: CareRouteDetail[];
}
