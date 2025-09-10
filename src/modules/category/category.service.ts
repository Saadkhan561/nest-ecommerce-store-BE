import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category-dto';
import {
  CreateCategoryInterface,
  GetCategoriesById,
} from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly category: Repository<Category>,
  ) {}

  async createCategory(
    category: CreateCategoryDto,
  ): Promise<CreateCategoryInterface> {
    const newCategory = this.category.create({
      name: category.name,
      parentCategory: { id: category.parentCategory },
      img_url: category.img_url,
    });
    await this.category.save(newCategory);
    return {
      data: {
        name: newCategory.name,
        parentCategory: String(newCategory.parentCategory.id),
        img_url: newCategory.img_url,
      },
      message: 'Category created successfully',
    };
  }

  async getCategoriesById(
    parentCategoryId: string,
  ): Promise<GetCategoriesById> {
    const categories = await this.category
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .leftJoinAndSelect('products.img_url', 'product_img_urls')
      .where('category.parentCategoryId = :parentCategoryId', {
        parentCategoryId,
      })
      .select([
        'category.id',
        'category.name',
        'products.id',
        'products.name',
        'products.description',
        'products.pinned',
        'products.productStatus',
        'product_img_urls.url',
      ])
      .getMany();

    return { categories: categories };
  }
}
