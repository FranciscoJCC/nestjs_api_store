import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: 'brands'})
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, unique: true})
  name: string;

  @Column({type: 'text', nullable: true})
  image?: string;

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

  /* Una marca tiene muchos productos */
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]
}
