import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

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
}
