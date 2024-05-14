import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto } from "../dtos/products.dto";
import { UpdateProductDto } from "../dtos/products.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepo: Repository<Product>){

  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number){
    const product = await this.productRepo.findOneBy({ id });

    if(!product){
      throw new NotFoundException('product not found');
    }

    return product;

  }

   create(data: CreateProductDto){

    //Creamos la instancia
    const newProduct = this.productRepo.create(data);

    //Creamos el producto
    /* newProduct.name = data.name;
    newProduct.description = data.description;
    newProduct.price = data.price;
    newProduct.stock = data.stock;
    newProduct.image = data.image; */
    //Guardamos el producto y lo retornamos
    return this.productRepo.save(newProduct);
  }

 async update(id: number, changes: UpdateProductDto){
    //Buscamos el recurso
    const product = await this.productRepo.findOne({ where: { id }});
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
