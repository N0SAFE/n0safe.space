import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, RefreshDto, TokenDto } from './dto';
import * as argon from 'argon2';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '../jwt/jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenService } from 'src/repository/refresh-token/refresh-token.service';
import { UserService } from '../repository/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly userService: UserService,
  ) {}
  public async signin(dto: AuthDto) {
    const user = await this.userService.findOneByEmail(dto.email);

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    const jti = uuidv4();
    const { accessToken, refreshToken } = this.jwtService.generateTokens(
      user,
      jti,
    );
    await this.refreshTokenService.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const jti = uuidv4();
      const { accessToken, refreshToken } = this.jwtService.generateTokens(
        user,
        jti,
      );
      await this.refreshTokenService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: user.id,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  public async logout(dto: TokenDto) {
    const { authorization } = dto;
    const payload = this.jwtService.verifyAccessToken(authorization);
    return payload;
  }

  public async refresh(dto: RefreshDto) {
    const { refreshToken } = dto;
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    const savedRefreshToken = await this.refreshTokenService.find(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true)
      throw new ForbiddenException('Invalid token');

    if (
      !this.jwtService.verifyHash(savedRefreshToken.hashedToken, refreshToken)
    ) {
      throw new ForbiddenException('Invalid token');
    }

    const user = await this.userService.find(savedRefreshToken.userId);
    if (!user) throw new ForbiddenException('Invalid token');

    await this.refreshTokenService.revoke(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } =
      this.jwtService.generateTokens(user, jti);
    await this.refreshTokenService.addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  public async revoke(user: User) {
    const { id: userId } = user;
    await this.refreshTokenService.revokeByUserId(userId);
    return { message: `Tokens revoked for user with id #${userId}` };
  }
}
