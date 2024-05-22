import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';



@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private categoryRepo:Repository<Category>
  ){}

  async findAll(){
    return await this.categoryRepo.find();
  }

  async findOne(id: number){
    const category = await this.categoryRepo.findOne({
      where: [{ id }],
      relations: ['products']
    });

    if(!category){
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findByName(name: string){
    const category = await this.categoryRepo.findOneBy({name});

    return category
  }

  async create(data: CreateCategoryDto){
    try {
      if(await this.findByName(data.name)){
        throw new BadRequestException('Category is already exists');
      }

      const newCategory = await this.categoryRepo.create(data);

      return this.categoryRepo.save(newCategory);
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}`);
    }
  }


  async update(id: number, changes : UpdateCategoryDto){
    const category = await this.findOne(id);

    this.categoryRepo.merge(category, changes);

    return this.categoryRepo.save(category);
  }

  async delete(id: number){
    //Validamos que el producto exista
    const category = await this.findOne(id);

    return this.categoryRepo.delete(id);
  }



}
