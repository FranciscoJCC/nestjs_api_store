import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Customer } from "./customer.entity";

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  EMPLOYE = 'employe'
}

@Entity({ name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true})
  email: string;

  @Column({ type: 'varchar'})
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER})
  role: string;

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

  @OneToOne(() => Customer,(customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id'}) //Carga la relacion 1:1 con este decorador
  customer: Customer
}
