import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'saad@yopmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123',
  })
  @IsString()
  password: string;
}
