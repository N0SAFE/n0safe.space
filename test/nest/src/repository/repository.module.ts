import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { ProjectModule } from './project/project.module';
import { ProcessModule } from './process/process.module';
import { FileUploaderProcessModule } from './file-uploader-process/file-uploader-process.module';
import { FileRewriteProcessModule } from './file-rewrite-process/file-rewrite-process.module';
import { DomainModule } from './domain/domain.module';
import { CommandExecutionProcessModule } from './command-execution-process/command-execution-process.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [
    UserModule,
    RefreshTokenModule,
    ProjectModule,
    ProcessModule,
    FileUploaderProcessModule,
    FileRewriteProcessModule,
    DomainModule,
    CommandExecutionProcessModule,
    JwtModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'refresh-token',
        module: RefreshTokenModule,
      },
    ]),
  ],
})
export class RepositoryModule {}
