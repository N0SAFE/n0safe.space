import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: any, res: any, next: () => void) {
    this.logger.debug(
      `[${req.method}] ${req.originalUrl} with body: ${JSON.stringify(
        req.body,
      )} from ${req.ip}`,
    );
    next();
  }
}
