import { Product } from 'src/modules/product/interface/product.interface';

export interface CreateCategoryInterface {
  data: {
    name: string;
    parentCategory: string;
    img_url: string;
  };
  message: string;
}

export interface Category {
  id: number;
  name: string;
  parentCategoryId: number;
}

export interface CategoryWithProduct
  extends Omit<Category, 'parentCategoryId'> {
  products: Product[];
}

export interface GetCategoriesById {
  categories: CategoryWithProduct[];
}
