import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);
  constructor(readonly configService: ConfigService) {
    const DATABASE_URL = configService.get('DATABASE_URL');
    super({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });
    this.logger.debug('DATABASE_URL: ' + DATABASE_URL);
    this.$on('query' as 'beforeExit', (e) => {
      this.logger.debug(JSON.stringify(e));
    });
  }
}
