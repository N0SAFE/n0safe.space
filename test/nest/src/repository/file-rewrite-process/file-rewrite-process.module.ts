import { Module } from '@nestjs/common';
import { FileRewriteProcessService } from './file-rewrite-process.service';
import { FileRewriteProcessController } from './file-rewrite-process.controller';

@Module({
  controllers: [FileRewriteProcessController],
  providers: [FileRewriteProcessService],
})
export class FileRewriteProcessModule {}
