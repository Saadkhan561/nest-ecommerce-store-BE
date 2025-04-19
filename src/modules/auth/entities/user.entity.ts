import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
import { UserRole } from '../enum/user.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: UserRole;

  @Column()
  isGuest: boolean;

  @Column()
  address: string;

  @Column()
  city: string;

  @OneToMany(() => Order, (order) => order.customerId, { cascade: true })
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
