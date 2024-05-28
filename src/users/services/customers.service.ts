import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, FilterCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';


@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ){}

  async findAll(params: FilterCustomerDto){

    const { limit, offset } = params;

    return await this.customerRepo.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(id: number){
    const customer = this.customerRepo.findOneBy({ id });

    if(!customer){
      throw new NotFoundException('customer not found');
    }

    return customer;
  }

  async create(data: CreateCustomerDto){

    const newCustomer = await this.customerRepo.create(data);

    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto){

    const customer = await this.findOne(id);

    this.customerRepo.merge(customer, changes);

    return this.customerRepo.save(customer);
  }

  async delete(id: number){
    const customer = await this.findOne(id);

    return this.customerRepo.delete(id);
  }
}
