import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ForgotPassResponse,
  LoginResponse,
  SignupResponse,
  UserUpdateResponse,
} from './interface/user.interface';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ForgotPassDto } from './dto/forgot-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('sign-up')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupResponse> {
    return this.authService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @Post('update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponse> {
    return this.authService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged in user',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email sent message',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({
    type: ForgotPassDto,
  })
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPassword: ForgotPassDto,
  ): Promise<ForgotPassResponse> {
    return this.authService.forgotPassword(forgotPassword);
  }

  @ApiOperation({ summary: 'Verify Otp' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Otp verification message',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({
    type: VerifyEmailDto,
  })
  @Post('/verify-otp')
  async verifyOtp(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<ForgotPassResponse> {
    return this.authService.verifyOtp(verifyEmailDto);
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset message',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({
    type: ResetPasswordDto,
  })
  @Post('/reset-password')
  async resetPassword(
    @Body()
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ForgotPassResponse> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
