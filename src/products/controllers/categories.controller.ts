import { Controller, Param, Query, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, FilterCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

  //Iyectamos la instancia
  constructor(private categoriesService: CategoriesService){

  }

  @Get('/')
  @HttpCode(HttpStatus.ACCEPTED)
  get(@Query() params: FilterCategoryDto){
    return this.categoriesService.findAll(params);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number){
    return this.categoriesService.findOne(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateCategoryDto){
    return this.categoriesService.create(payload);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCategoryDto){
    return this.categoriesService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.categoriesService.delete(id);
  }

}
