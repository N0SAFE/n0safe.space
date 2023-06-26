import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  providers: [RefreshTokenService],
  imports: [JwtService],
})
export class RefreshTokenModule {}
