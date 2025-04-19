import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'database12345',
        database: 'perfume-store',
        // entities: [User, Category, ParentCategory, Product, ProductOptions],
        autoLoadEntities: true,
        synchronize: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
