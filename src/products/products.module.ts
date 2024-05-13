import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Products */
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
/* Brands */
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';
/* Categories */
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Product, Brand, Category]) ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
