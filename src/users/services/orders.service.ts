import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto, FilterOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ){}

  async findAll(params?: FilterOrderDto){

    const { limit, offset } = params;

    return await this.orderRepo.find({
      relations: ['customer'],
      take: limit,
      skip: offset
    });
  }

  async findOne(id: number){
    const order = await this.orderRepo.findOne({
      where: [{ id }],
      relations: ['items','items.product', 'customer']
    });

    if(!order){
      throw new NotFoundException('order not found');
    }

    return order;
  }

  async create(data: CreateOrderDto){
    const order = new Order();

    if(data.customerId){
      const customer = await this.customerRepo.findOne({
        where: [ { id: data.customerId}]
      });

      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async update(id:number, changes: UpdateOrderDto){
    const order = await this.orderRepo.findOne({
      where: [{ id }]
    });

    if(changes.customerId){
      const customer = await this.customerRepo.findOne({
        where: [{ id }]
      });

      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async delete(id: number){
    if(!await this.findOne(id)){
      throw new NotFoundException('Order don´t exists');
    }

    return this.orderRepo.delete(id);
  }
}
