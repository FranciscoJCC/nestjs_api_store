import { Controller, Get, Param, Query, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  //Inyectamos una intancia de productService
  constructor(private productsService: ProductsService){

  }

  /* PARA RUTAS ESTATICAS DEBEN IR PRIMERO QUE LAS DINAMICAS
    PARA EVITAR CONFLICTOS ENTRE ELLAS
    ENDPOINT ESTATICO, NO RECIBE PARAMATROS
  */
    @Get('/filter')
    getProductFilter(){
      return 'yo soy un filter';
    }

    @Get('/')
    @ApiOperation({ summary: 'List of products'})
    @HttpCode(HttpStatus.ACCEPTED)
    get(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0,
      @Query('brand') brand: string
    ){
      return this.productsService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('id', ParseIntPipe) id: number){
      return this.productsService.findOne(id);
    }

    @Post('/')
    create(@Body() payload: CreateProductDto){
      return this.productsService.create(payload);
    }

    @Put('/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto){
      return this.productsService.update(id, payload);
    }

    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id:number){
      return this.productsService.delete(id);
    }
}
