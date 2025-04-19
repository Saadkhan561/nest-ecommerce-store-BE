import { Body, Controller, Post } from '@nestjs/common';
import { ParentCategoryService } from './parent_category.service';
import { CreateParentCategoryDto } from './dto/create-parent-category';

@Controller('parent-category')
export class ParentCategoryController {
  constructor(private readonly parentCategoryService: ParentCategoryService) {}

  @Post()
  async createParentCategory(
    @Body() createParentCategoryDto: CreateParentCategoryDto,
  ) {
    return this.parentCategoryService.createParentCategory(
      createParentCategoryDto,
    );
  }
}
