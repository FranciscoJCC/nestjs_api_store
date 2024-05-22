import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { Customer } from './customer.entity';
import { OrderItem } from './orderItem.entity';

@Entity('order')
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  //Muchas ordenes pertenecen a un cliente
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  //Una orden tiene varios detalles de la orden
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
