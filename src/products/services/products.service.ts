import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";

import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService
  ){}

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id: number){
    const product = await this.productRepo.findOne({
      where: [{ id }],
      relations: ['brand']
    });

    if(!product){
      throw new NotFoundException('product not found');
    }

    return product;

  }

  async findByName(name: string){
    const product = await this.productRepo.findOneBy({ name});

    return product
  }

  async create(data: CreateProductDto){
    try {

      if(this.findByName(data.name)){
        throw new BadRequestException('Product is already exists');
      }

      const newProduct = await this.productRepo.create(data);

      if(data.brandId){
        const brand = await this.brandService.findOne(data.brandId);
        newProduct.brand = brand;
      }

      return this.productRepo.save(newProduct);

    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}`);
    }
  }

 async update(id: number, changes: UpdateProductDto){
    //Buscamos el recurso
    const product = await this.productRepo.findOne({ where: { id }});

    if(changes.brandId){
      const brand = await this.brandService.findOne(changes.brandId);

      product.brand = brand;
    }
    //Convinamos los cambios
    this.productRepo.merge(product, changes);
    //Guardamos los cambios y retornamos el recurso
    return this.productRepo.save(product);
  }

   delete(id: number){
    //Validamos que el producto exista
    const product = this.findOne(id);

    return this.productRepo.delete(id);
  }

}
