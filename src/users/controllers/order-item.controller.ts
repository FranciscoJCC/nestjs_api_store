import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/orderItem.dto';
import { OrderItemService } from '../services/order-item.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order Items')
@Controller('order-item')
export class OrderItemController {

  constructor(private orderItemService: OrderItemService){}


  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateOrderItemDto){
    return this.orderItemService.create(payload);
  }

  @Delete('/:orderItem/order/:orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('orderItem', ParseIntPipe) orderItem: number
  ){
    return this.orderItemService.deleteOneItemOrder(orderId, orderItem);
  }
}
