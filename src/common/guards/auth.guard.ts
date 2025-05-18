import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not found');
    }
    const token = authorization.split(' ')[1];
    try {
      const userVerified = await this.jwtService.verifyAsync(token);
      request.user = {
        userId: userVerified.userId,
        userName: userVerified.userName,
        roles: userVerified.roles,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
