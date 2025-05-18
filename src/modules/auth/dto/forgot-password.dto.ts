import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPassDto {
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'saad@yopmail.com',
  })
  @IsEmail()
  email: string;
}
