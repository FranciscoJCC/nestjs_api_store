import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService){}

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(){
    return this.orderService.findAll()
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number){
    return this.orderService.findOne(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateOrderDto){
    return this.orderService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateOrderDto){
    return this.orderService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.orderService.delete(id);
  }
}
