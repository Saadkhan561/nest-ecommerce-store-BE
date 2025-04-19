import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
