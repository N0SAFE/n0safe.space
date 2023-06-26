import { Module } from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import { UserModule } from './repository/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenModule } from './repository/refresh-token/refresh-token.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, PrismaModule, RefreshTokenModule, JwtModule],
})
export class AppModule {}
