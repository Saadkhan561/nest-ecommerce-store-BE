import { ParentCategory } from 'src/modules/parent_category/entities/parent-category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
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

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];

  @Column()
  parentCategoryId: number;

  @ManyToOne(() => ParentCategory, (parentCategory) => parentCategory.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentCategoryId' })
  parentCategory: ParentCategory;

  @Column()
  img_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
