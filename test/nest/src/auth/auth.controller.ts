import { Body, Controller, Post, Request, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshDto } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('signin')
  public signin(@Body() dto: AuthDto) {
    this.logger.log('signin');
    return this.authService.signin(dto);
  }

  @Post('signup')
  public signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('refresh')
  public refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }

  @Post('revoke')
  public revoke(@Request() req) {
    return this.authService.revoke(req.user as User);
  }
}
