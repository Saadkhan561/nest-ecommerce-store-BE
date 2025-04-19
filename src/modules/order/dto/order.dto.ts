import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enum/order.enum';
import { OrderProducts } from '../interface/order.interface';

export class CreateOrderDto {
  @ApiProperty({
    example: [{ productId: 5, quantity: 2, priceAtOrder: 1200 }],
    description: 'Enter IDs of bought products',
    required: true,
  })
  products: OrderProducts[];

  @ApiProperty({
    example: 1,
    description: 'Enter customer ID',
    required: true,
  })
  customerId: number;

  @ApiProperty({
    example: 5000,
    description: 'Enter order total price',
    required: true,
  })
  totalAmount: number;

  @ApiProperty({
    example: 40,
    description: 'Enter discount in number',
    required: true,
  })
  discount: number;

  @ApiProperty({
    example: OrderStatus.PENDING,
    description: 'Enter order status',
    required: true,
    enum: OrderStatus,
  })
  orderStatus: OrderStatus.PENDING;

  @ApiProperty({
    example: 'Karachi',
    description: 'Enter city',
    required: true,
  })
  city: string;

  @ApiProperty({
    example: 'H-353',
    description: 'Enter address',
    required: true,
  })
  address: string;
}
