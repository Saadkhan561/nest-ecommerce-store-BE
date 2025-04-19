import { Test, TestingModule } from '@nestjs/testing';
import { ParentCategoryController } from './parent_category.controller';
import { ParentCategoryService } from './parent_category.service';

describe('ParentCategoryController', () => {
  let controller: ParentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentCategoryController],
      providers: [ParentCategoryService],
    }).compile();

    controller = module.get<ParentCategoryController>(ParentCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
