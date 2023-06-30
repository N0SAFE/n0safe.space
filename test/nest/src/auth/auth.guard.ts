import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/repository/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve) => {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization;

      if (!token) throw new ForbiddenException('No token provided');

      // verify token
      try {
        const decoded = this.jwtService.verifyAccessToken(token);
        // attach user to request object
        request.user = await this.userService.find(decoded.userId);
        resolve(true);
      } catch (e) {
        this.logger.error(e.message);
        resolve(false);
      }
    });
  }
}
