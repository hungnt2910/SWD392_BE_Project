import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { Role } from './Role'
import { Order } from './Order'
import { Reviews } from './Reviews'
import { Blogs } from './Blogs'
import { UserVoucher } from './UserVoucher'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  email: string

  @Column({ default: true })
  status: boolean

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[]

  @OneToMany(() => Blogs, (blog) => blog.user)
  blogs: Blogs[]

  @OneToMany(() => UserVoucher, (uv) => uv.user)
  userVouchers: UserVoucher[]
}
