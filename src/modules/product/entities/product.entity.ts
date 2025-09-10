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
import { ProductOptions } from './product_options.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { ProductImgUrl } from './product-img-urls.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  pinned: boolean;

  @Column()
  productStatus: boolean;

  @OneToMany(() => ProductOptions, (option) => option.product, {
    cascade: true,
  })
  options: ProductOptions[];

  @OneToMany(() => ProductImgUrl, (img_url) => img_url.product, {
    cascade: true,
  })
  img_url: ProductImgUrl[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
