import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductOptionsDto {
  @ApiProperty({
    example: 50,
    description: 'Amount of perfume in ml',
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 2500,
    description: 'Price of the option',
    required: true,
  })
  @IsNumber()
  price: number;
}
