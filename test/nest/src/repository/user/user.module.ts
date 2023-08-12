import { Module, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [JwtModule],
})
export class UserModule {}
