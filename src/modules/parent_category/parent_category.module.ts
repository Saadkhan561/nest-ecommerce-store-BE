import { Module } from '@nestjs/common';
import { ParentCategoryService } from './parent_category.service';
import { ParentCategoryController } from './parent_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent-category.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentCategory, Category])],
  controllers: [ParentCategoryController],
  providers: [ParentCategoryService],
})
export class ParentCategoryModule {}
