import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService){}


  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(){
    return this.usersService.findAll();
  }

  @Get('/tasks')
  @HttpCode(HttpStatus.ACCEPTED)
  getTasks(){
    //return this.usersService.getTasks();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number){
    return this.usersService.findOne(id);
  }

  @Get('/:id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('id', ParseIntPipe) id: number){
    //return this.usersService.getOrdersByUser(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDto){
    return this.usersService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto){
    return this.usersService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.usersService.delete(id);
  }
}
