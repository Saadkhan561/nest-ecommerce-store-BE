import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'saad@yopmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Otp',
    required: true,
    example: '123456',
  })
  @IsString()
  Otp: string;
}
