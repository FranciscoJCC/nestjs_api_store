import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  quantity: number;

  @Column({ type: 'float'})
  price_unit: number

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

  //Una orden-detalle pertenece a un producto
  @ManyToOne(() => Product)
  product: Product;

  //Una orden-detalle pertenece a una orden
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
