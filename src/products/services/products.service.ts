import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between, FindOptionsWhere } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from "../dtos/products.dto";

import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ){}

  async findAll(params?: FilterProductDto) {

      const where: FindOptionsWhere<Product> = {};
      const {limit, offset, maxPrice, minPrice } = params;

      if(minPrice && maxPrice){
        where.price = Between(minPrice, maxPrice)
      }

      return await this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset
      });
  }

  async findOne(id: number){
    const product = await this.productRepo.findOne({
      where: [{ id }],
      relations: ['brand', 'categories']
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

      if(await this.findByName(data.name)){
        throw new BadRequestException('Product is already exists');
      }

      const newProduct = await this.productRepo.create(data);

      /* Insertamos la marca */
      if(data.brandId){
        const brand = await this.brandRepo.findOneBy({ id : data.brandId});
        newProduct.brand = brand;
      }

      /* Insertamos las categorias */
      if(data.categoriesIds){
        const categories = await this.categoryRepo.findBy({id : In(data.categoriesIds)});
        newProduct.categories = categories;
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
      const brand = await this.brandRepo.findOneBy({id: changes.brandId});

      product.brand = brand;
    }
    //Convinamos los cambios
    this.productRepo.merge(product, changes);
    //Guardamos los cambios y retornamos el recurso
    return this.productRepo.save(product);
  }


  async removeCategoryByProduct(productId: number, categoryId: number){
    const product = await this.productRepo.findOne({
      where: [ { id: productId} ],
      relations: ['categories']
    });

    product.categories = product.categories.filter((item) => item.id !== categoryId);

    return this.productRepo.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number){
    //Buscamos el producto
    const product = await this.productRepo.findOne({
      where: [{ id : productId }],
      relations: ['categories']
    });

    if(!product){
      throw new BadRequestException('Product ID is not exists');
    }

    //Buscamos la categoria
    const category = await this.categoryRepo.findOneBy({ id: categoryId});

    //Si no existe la categoria
    if(!category){
      throw new BadRequestException('Category ID is not exists');
    }

    //Buscamos si no exista ya la categoria en el producto, si no existe la agregamos
    if(!product.categories.find((item) => item.id === categoryId)){
      product.categories.push(category);
    }

    return this.productRepo.save(product);
  }

   delete(id: number){
    //Validamos que el producto exista
    const product = this.findOne(id);

    return this.productRepo.delete(id);
  }

}
