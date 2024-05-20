import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Customer } from "./customer.entity";

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  EMPLOYE = 'employe'
}

@Entity('user')
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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => Customer,(customer) => customer.user, { nullable: true })
  @JoinColumn() //Carga la relacion 1:1 con este decorador
  customer: Customer
}
