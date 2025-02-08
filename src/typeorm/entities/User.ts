import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    username: string;

    @Column()
    password: string

    @Column({nullable: true})
    email: string

    @Column()
    created_at: Date;
}