export interface CreateProductInterface {
  data: {
    name: string;
    description: string;
    categoryId: number;
    pinned: boolean;
    productStatus: boolean;
    img_url: string;
  };
  message: string;
}
