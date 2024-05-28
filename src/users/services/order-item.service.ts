import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/orderItem.dto';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { Product } from '../../products/entities/product.entity';


@Injectable()
export class OrderItemService {

  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ){}

  async create(data: CreateOrderItemDto){
    const order = await this.orderRepo.findOneBy({ id: data.orderId});
    const product = await this.productRepo.findOneBy({ id: data.productId});

    if(!order || !product){
      throw new BadRequestException('Product or Order don´t exists');
    }

    /* const orderItems = await this.orderItemRepo.find({
      relations: [
        'product',
        'order'
      ],
      loadRelationIds: true,
      where: [{
        productId : product.id
      }]
    }); TO-DO - agregar si ya existe el producto y no escribir uno nuevo */

    const item = new OrderItem();

    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    item.priceUnit = product.price;

    return this.orderItemRepo.save(item);
  }

  async validateItemExist(){

  }

  async deleteOneItemOrder(orderId: number, itemId: number){
    //Consultamos la orden
    const order = await this.orderRepo.findOneBy({ id: orderId});

    if(!order){
      throw new BadRequestException('Order don´t exists');
    }

    //Consultamos el item de la orden y la orden
    const itemOrder = await this.orderItemRepo.findOne({
      where: [{
        id: itemId
      }],
      relations: ['order']
    });

    //Si no existe el item
    if(!itemOrder){
      throw new BadRequestException('OrderItem don´t exists');
    }

    //El item debe pertenecer a la orden solicitada
    if(order.id !== itemOrder.order.id){
      throw new BadRequestException('the product does not belong to the order');
    }


    return this.orderItemRepo.delete(itemOrder.id);
  }
}
