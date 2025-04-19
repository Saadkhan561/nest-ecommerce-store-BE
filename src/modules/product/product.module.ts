import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductOptions } from './entities/product_options.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOptions])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
