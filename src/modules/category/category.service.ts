import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category-dto';
import { CreateCategoryInterface } from './interface/category.interface';

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
}
