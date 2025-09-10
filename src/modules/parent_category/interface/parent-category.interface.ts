import { Category } from 'src/modules/category/interface/category.interface';

export interface ParentCategoryInterface {
  data: {
    name: string;
  };
  message: string;
}

export interface ParentCategory {
  id: number;
  name: string;
  categories: Category[];
}

export interface GetParentCategories {
  parent_categories: ParentCategory[];
}
