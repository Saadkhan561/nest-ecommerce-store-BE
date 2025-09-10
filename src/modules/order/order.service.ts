import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order.dto';
import { CreateOrderInterface } from './interface/order.interface';
import { OrderItems } from './entities/order-items.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly order: Repository<Order>,

    @InjectRepository(OrderItems)
    private readonly orderItems: Repository<OrderItems>,
  ) {}
  async createOrder(order: CreateOrderDto): Promise<CreateOrderInterface> {
    const newOrder = this.order.create({
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      discount: order.discount,
      orderStatus: order.orderStatus,
      city: order.city,
      address: order.address,
    });
    await this.order.save(newOrder);

    const itemsArray = order.products.map((item) => {
      return this.orderItems.create({
        productId: item.productId,
        productOptionId: item.productOptionId,
        quantity: item.quantity,
        priceAtOrder: item.priceAtOrder,
        orderId: newOrder.id,
      });
    });
    await this.orderItems.save(itemsArray);

    return {
      data: {
        customerId: newOrder.customerId.toString(),
        totalAmount: newOrder.totalAmount,
        discount: newOrder.discount,
        orderStatus: newOrder.orderStatus,
        shippingAddress: {
          city: newOrder.city,
          address: newOrder.address,
        },
      },
      message: 'Order created successfully',
    };
  }
}
