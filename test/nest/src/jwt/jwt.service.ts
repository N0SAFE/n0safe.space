import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}
  public generateAccessToken(user) {
    return jwt.sign(
      { userId: user.id },
      this.configService.get('JWT_ACCESS_SECRET'),
      {
        expiresIn: '5m',
      },
    );
  }

  public generateRefreshToken(user, jti) {
    return jwt.sign(
      {
        userId: user.id,
        jti,
      },
      this.configService.get('JWT_REFRESH_SECRET'),
      {
        expiresIn: '8h',
      },
    );
  }

  public generateTokens(user, jti) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user, jti);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async hashToken(token) {
    const hash = await argon.hash(token);
    return hash;
  }

  public async verifyHash(hash, token) {
    const pwMatches = await argon.verify(hash, token);
    return pwMatches;
  }

  public verifyRefreshToken(token) {
    return jwt.verify(token, this.configService.get('JWT_REFRESH_SECRET'));
  }

  public verifyAccessToken(token) {
    return jwt.verify(token, this.configService.get('JWT_ACCESS_SECRET'));
  }
}
