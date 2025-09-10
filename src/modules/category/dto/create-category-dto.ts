import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'J.',
    description: 'Category name',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Parent category id',
    required: true,
  })
  @IsNumber()
  parentCategory: number;

  @ApiProperty({
    description: 'Category Image',
    required: true,
  })
  @IsString()
  img_url: string;
}
