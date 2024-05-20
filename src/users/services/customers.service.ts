import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    /* {
      id: 1,
      name: "Francisco",
      lastname: "Cervantes",
      phone: "3352585247"
    } */
  ];

  findAll(){
    return this.customers;
  }

  findOne(id: number){
    const customer = this.customers.find((item) => item.id === id);

    if(!customer){
      throw new NotFoundException('customer not found');
    }

    return customer;
  }

  create(payload: CreateCustomerDto){
    this.counterId++;

    const newCustomer = {
      id: this.counterId,
      ...payload
    };

    //this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto){
    const user = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);

    this.customers[index] = {
      ...user,
      ...payload,
      id
    };

    return this.customers[index];
  }

  delete(id: number){
    const customer = this.findOne(id);

    const index = this.customers.indexOf(customer);

    this.customers.splice(index, 1);

    return { message: "customer deleted" };
  }
}
