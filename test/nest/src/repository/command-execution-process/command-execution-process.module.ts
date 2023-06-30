import { Module } from '@nestjs/common';
import { CommandExecutionProcessService } from './command-execution-process.service';
import { CommandExecutionProcessController } from './command-execution-process.controller';

@Module({
  controllers: [CommandExecutionProcessController],
  providers: [CommandExecutionProcessService],
})
export class CommandExecutionProcessModule {}
