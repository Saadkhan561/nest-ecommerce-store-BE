import { OrderStatus } from '../enum/order.enum';

export interface OrderProducts {
  productId: number;
  productOptionId: number;
  quantity: number;
  priceAtOrder: number;
}

export interface ShippingAddress {
  city: string;
  address: string;
}

export interface CreateOrderInterface {
  data: {
    customerId: string;
    totalAmount: number;
    discount: number;
    orderStatus: OrderStatus;
    shippingAddress: ShippingAddress;
  };
  message: string;
}
