import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandExecutionProcessDto } from './create-command-execution-process.dto';

export class UpdateCommandExecutionProcessDto extends PartialType(
  CreateCommandExecutionProcessDto,
) {}
