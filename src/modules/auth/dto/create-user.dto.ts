import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../enum/user.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    required: true,
    example: 'Saad',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'User last name',
    required: true,
    example: 'Khan',
  })
  @IsString()
  last_name: string;

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

  @ApiProperty({
    description: 'User phone',
    required: true,
    example: '03237092577',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User role',
    required: true,
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'User status',
    required: true,
    example: 'true',
  })
  isGuest: boolean;

  @ApiProperty({
    description: 'User address',
    required: true,
    example: 'H-353, Sabir colony',
  })
  address: string;

  @ApiProperty({
    description: 'User city',
    required: true,
    example: 'Karachi',
  })
  city: string;
}
