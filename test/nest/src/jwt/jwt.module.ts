import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [JwtService],
  exports: [JwtService],
  imports: [ConfigModule],
})
export class JwtModule {}
