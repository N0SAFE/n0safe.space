import { Injectable, NestMiddleware, ForbiddenException, Logger } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/repository/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    // get token form authorization header
    const token = req.headers.authorization;

    if (!token) throw new ForbiddenException('No token provided');

    // verify token
    try {
      const decoded = this.jwtService.verifyAccessToken(token);
      // attach user to request object
      req.user = await this.userService.find(decoded.userId);
      next();
    } catch (e) {
      this.logger.error(e.message);
      throw new ForbiddenException('Invalid token');
    }
  }
}
