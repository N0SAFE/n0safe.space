import { Module } from '@nestjs/common';
import { FileUploaderProcessService } from './file-uploader-process.service';
import { FileUploaderProcessController } from './file-uploader-process.controller';

@Module({
  controllers: [FileUploaderProcessController],
  providers: [FileUploaderProcessService],
})
export class FileUploaderProcessModule {}
