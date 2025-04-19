import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateParentCategoryDto {
  @ApiProperty({
    example: 'Perfumes',
    description: 'The name of the parent category',
    required: true,
  })
  @IsString()
  name: string;
}
