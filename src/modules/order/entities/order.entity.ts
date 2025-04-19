import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enum/order.enum';
import { OrderItems } from './order-items.entity';
import { User } from 'src/modules/auth/entities/user.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order, {
    cascade: true,
  })
  products: OrderItems[];

  @Column()
  customerId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @Column()
  totalAmount: number;

  @Column()
  discount: number;

  @Column()
  orderStatus: OrderStatus;

  @Column()
  city: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
