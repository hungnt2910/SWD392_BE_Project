import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column()
    roleName: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
