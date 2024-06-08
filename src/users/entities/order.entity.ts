import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Customer } from './customer.entity';
import { OrderItem } from './orderItem.entity';

@Entity({name: 'orders'})
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  //Muchas ordenes pertenecen a un cliente
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id'})
  customer: Customer;

  //Una orden tiene varios detalles de la orden
  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  //Transformamos los datos, agregamos quantity a products
  @Expose()
  get products(){
    if(this.items){
      return this.items.filter((item) => !!item).map((item) => ({
        ...item.product,
        quantity: item.quantity,
        itemId: item.id
      }))
    }
    return [];
  }

  @Expose()
  get total(){
    if(this.items){
      return this.items.filter((item) => !!item).reduce((total, item) => {
        const totalItem = item.product.price * item.quantity
        return total + totalItem;
      }, 0)
    }
    return 0;
  }
}
