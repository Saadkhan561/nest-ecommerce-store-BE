import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent-category.entity';
import { Repository } from 'typeorm';
import { CreateParentCategoryDto } from './dto/create-parent-category';
import { ParentCategoryInterface } from './interface/parent-category.interface';

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
}
