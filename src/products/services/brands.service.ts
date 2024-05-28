import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, FilterBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand) private brandRepo: Repository<Brand>
  ){}

  async findAll(params?: FilterBrandDto){

    const {limit, offset} = params;

    return this.brandRepo.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(id){
    const brand = await this.brandRepo.findOne({
      where: [ { id: id }],
      relations: ['products']
    });

    if(!brand){
      throw new NotFoundException('brand not found');
    }

    return brand;
  }

  async create(data: CreateBrandDto){

    const newBrand = await this.brandRepo.create(data);

    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto){

    const brand = await this.findOne(id);

    this.brandRepo.merge(brand, changes);

    return this.brandRepo.save(brand);
  }

  async delete(id: number){

    const brand = await this.findOne(id);

    return this.brandRepo.delete(id);
  }

}
