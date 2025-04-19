import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  LoginResponse,
  SignupResponse,
  UserUpdateResponse,
} from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<SignupResponse> {
    const existingUser = await this.users.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.users.create({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
      isGuest: createUserDto.isGuest,
      address: createUserDto.address,
      city: createUserDto.city,
      role: createUserDto.role,
    });
    const createdUser = await this.users.save(user);
    return {
      user: createdUser,
      message: 'User created successfully',
    };
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponse> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    await this.users.update(id, {
      first_name: updateUserDto.first_name,
      last_name: updateUserDto.last_name,
      email: updateUserDto.email,
      password: hashedPassword,
      phone: updateUserDto.phone,
      isGuest: updateUserDto.isGuest,
      address: updateUserDto.address,
      city: updateUserDto.city,
      role: updateUserDto.role,
    });
    const updatedUser = await this.users.findOne({ where: { id } });
    return {
      user: updatedUser,
      message: 'User updated successfully',
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.users.findOne({ where: { email: loginDto.email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { password, ...userWithoutPassword } = user;
    console.log(password);

    return {
      user: userWithoutPassword,
      message: 'Login successful',
    };
  }
}
