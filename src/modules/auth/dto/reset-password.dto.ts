import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'saad@yopmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'newPassword',
    required: true,
    example: '123',
  })
  @IsString()
  newPassword: string;
}
