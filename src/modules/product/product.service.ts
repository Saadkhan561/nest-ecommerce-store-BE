import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOptions } from './entities/product_options.entity';
import { CreateProductDto } from './dto/create-product-dto';
import { CreateProductInterface } from './interface/product.interface';
import { ProductImgUrl } from './entities/product-img-urls.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
    @InjectRepository(ProductOptions)
    private readonly productOptions: Repository<ProductOptions>,
    @InjectRepository(ProductImgUrl)
    private readonly productImgUrls: Repository<ProductImgUrl>,
  ) {}

  async createProduct(
    product: CreateProductDto,
  ): Promise<CreateProductInterface> {
    const newProduct = this.product.create({
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      pinned: product.pinned,
      productStatus: product.productStatus,
    });
    await this.product.save(newProduct);
    const productOptions = product.options.map((option) => {
      return this.productOptions.create({
        amount: option.amount,
        price: option.price,
        productId: newProduct.id,
      });
    });

    const productImgUrls = product.img_urls.map((url) => {
      return this.productImgUrls.create({
        url: url,
        productId: newProduct.id,
      });
    });

    await this.productOptions.save(productOptions);

    await this.productImgUrls.save(productImgUrls);

    return {
      data: {
        name: newProduct.name,
        description: newProduct.description,
        categoryId: newProduct.categoryId,
        pinned: newProduct.pinned,
        productStatus: newProduct.productStatus,
        img_urls: productImgUrls.map((url) => url.url),
      },
      message: 'Product created successfully',
    };
  }
}
