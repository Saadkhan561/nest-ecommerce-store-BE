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
