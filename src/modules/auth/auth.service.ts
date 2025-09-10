import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPassDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { User } from './entities/user.entity';
import {
  ForgotPassResponse,
  LoginResponse,
  SignupResponse,
  UserUpdateResponse,
} from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
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

    const tokenPayload = {
      userId: user.id,
      userFirstName: user.first_name,
      userLastName: user.last_name,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return {
      accessToken: accessToken,
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

    const tokenPayload = {
      userId: user.id,
      userName: user.first_name + user.last_name,
      roles: user.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    const { password, ...userWithoutPassword } = user;

    console.log(password);

    return {
      accessToken: accessToken,
      user: userWithoutPassword,
      message: 'Login successful',
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPassDto,
  ): Promise<ForgotPassResponse> {
    const user = await this.users.findOne({ where: forgotPasswordDto });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 1 * 60 * 1000);

    user.otp = otp;
    user.otpExpirationDate = expiry;
    await this.users.save(user);

    this.mailService.sendOtpMail(
      forgotPasswordDto.email,
      'Password reset OTP',
      otp,
    );

    return {
      message: `Password reset OTP sent on ${forgotPasswordDto.email}`,
    };
  }

  async verifyOtp(verifyEmailDto: VerifyEmailDto): Promise<ForgotPassResponse> {
    const user = await this.users.findOne({
      where: { email: verifyEmailDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (verifyEmailDto.Otp !== user.otp) {
      throw new BadRequestException('Invalid Otp');
    }

    if (new Date() > user.otpExpirationDate) {
      user.otp = null;
      user.otpExpirationDate = null;
      await this.users.save(user);
      throw new BadRequestException('Otp has expired');
    }

    user.otp = null;
    user.otpExpirationDate = null;
    user.otpVerified = true;
    await this.users.save(user);

    return {
      message: 'Otp has been verified',
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ForgotPassResponse> {
    const user = await this.users.findOne({
      where: { email: resetPasswordDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.otpVerified) {
      throw new BadRequestException('Otp not verified');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

    user.password = hashedPassword;
    user.otpVerified = null;
    await this.users.save(user);

    return {
      message: 'Password reset successfully',
    };
  }
}
