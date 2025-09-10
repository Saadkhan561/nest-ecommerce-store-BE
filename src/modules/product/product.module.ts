import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductOptions } from './entities/product_options.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductImgUrl } from './entities/product-img-urls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOptions, ProductImgUrl])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
