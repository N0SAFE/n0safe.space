import { PartialType } from '@nestjs/mapped-types';
import { CreateFileRewriteProcessDto } from './create-file-rewrite-process.dto';

export class UpdateFileRewriteProcessDto extends PartialType(
  CreateFileRewriteProcessDto,
) {}
