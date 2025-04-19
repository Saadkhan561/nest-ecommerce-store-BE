import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  LoginResponse,
  SignupResponse,
  UserUpdateResponse,
} from './interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupResponse> {
    return this.authService.createUser(createUserDto);
  }

  @Post('update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponse> {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }
}
