import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { ProductOptionsDto } from './product-option-dto';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'Product Name',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product Description',
    description: 'Product Description',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'J.',
    description: 'Product Category',
    required: true,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 'true',
    description: 'Pinned status',
    required: true,
  })
  @IsBoolean()
  pinned: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Product Status',
    required: true,
  })
  @IsBoolean()
  productStatus: boolean;

  @ApiProperty({
    description: 'Array of product options',
    type: [ProductOptionsDto],
    required: true,
  })
  @IsObject()
  options: ProductOptionsDto[];
}
