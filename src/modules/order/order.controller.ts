import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthorizationHeader } from 'src/common/enums';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '../auth/enum/user.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }
}
