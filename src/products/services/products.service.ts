import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findByName(name: string){
    const product = await this.productRepo.findOneBy({ name});

    return product
  }

  async create(data: CreateProductDto){

    //Verificamos que no exista el producto
    const findProduct = await this.findByName(data.name);

    //Creamos la instancia
    try {
      if(!findProduct){
        const newProduct = await this.productRepo.create(data);

        return this.productRepo.save(newProduct);
      }else{
        throw new BadRequestException('No se ha encontrado el producto');
      }
    } catch (error) {
      throw new BadRequestException('Ha ocurrido un error, intenta de nuevo');
    }

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
