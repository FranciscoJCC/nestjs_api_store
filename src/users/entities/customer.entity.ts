import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'varchar', length: 100})
  name: string;
  @Column({type: 'varchar', length: 100})
  lastname: string;
  @Column({type: 'varchar', length: 15})
  phone: string;
}
