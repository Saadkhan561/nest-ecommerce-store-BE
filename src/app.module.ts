import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './modules/database/databae.module';
import { ParentCategoryModule } from './modules/parent_category/parent_category.module';
import { ProductModule } from './modules/product/product.module';

import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    ParentCategoryModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
