import { PartialType } from '@nestjs/mapped-types';
import { CreateFileUploaderProcessDto } from './create-file-uploader-process.dto';

export class UpdateFileUploaderProcessDto extends PartialType(
  CreateFileUploaderProcessDto,
) {}
