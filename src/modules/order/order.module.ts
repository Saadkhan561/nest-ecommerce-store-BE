import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItems } from './entities/order-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItems])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
