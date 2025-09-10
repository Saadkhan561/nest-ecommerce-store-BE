import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent-category.entity';
import { Repository } from 'typeorm';
import { CreateParentCategoryDto } from './dto/create-parent-category';
import {
  GetParentCategories,
  ParentCategoryInterface,
} from './interface/parent-category.interface';

@Injectable()
export class ParentCategoryService {
  constructor(
    @InjectRepository(ParentCategory)
    private readonly parentCategory: Repository<ParentCategory>,
  ) {}

  async createParentCategory({
    name,
  }: CreateParentCategoryDto): Promise<ParentCategoryInterface> {
    const parentCategory = this.parentCategory.create({ name: name });
    await this.parentCategory.save(parentCategory);
    return {
      data: parentCategory,
      message: 'Parent category created successfully',
    };
  }

  async getParentCategories(): Promise<GetParentCategories> {
    const parent_categories = await this.parentCategory
      .createQueryBuilder('parent_category')
      .leftJoinAndSelect('parent_category.categories', 'category')
      .select([
        'parent_category.id',
        'parent_category.name',
        'category.id',
        'category.name',
        'category.parentCategoryId',
      ])
      .getMany();

    return { parent_categories: parent_categories };
  }
}
