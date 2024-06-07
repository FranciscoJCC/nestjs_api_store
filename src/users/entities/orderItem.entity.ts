import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_items'})
export class OrderItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  quantity: number;

  @Column({ name: 'price_unit', type: 'float'})
  priceUnit: number

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  //Una orden-detalle tiene a un producto
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id'})
  product: Product;

  //Una orden-detalle pertenece a una orden
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id'})
  order: Order;
}
