export interface CreateProductInterface {
  data: {
    name: string;
    description: string;
    categoryId: number;
    pinned: boolean;
    productStatus: boolean;
    img_urls: string[];
  };
  message: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  pinned: boolean;
  productStatus: boolean;
  created_at: Date;
  img_url: ProductImgUrl[];
}

export interface ProductImgUrl {
  id: number;
  url: string;
}
