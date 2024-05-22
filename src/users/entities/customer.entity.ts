import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 100})
  name: string;

  @Column({type: 'varchar', length: 100})
  lastname: string;

  @Column({type: 'varchar', length: 15})
  phone: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  //Desde la tabla de users, quien tiene la referencia
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User

  //Un cliente tiene muchas ordenes
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
