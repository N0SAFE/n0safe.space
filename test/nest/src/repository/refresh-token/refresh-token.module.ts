import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  providers: [RefreshTokenService],
  imports: [JwtModule],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
