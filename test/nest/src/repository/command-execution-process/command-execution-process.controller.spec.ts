import { Test, TestingModule } from '@nestjs/testing';
import { CommandExecutionProcessController } from './command-execution-process.controller';
import { CommandExecutionProcessService } from './command-execution-process.service';

describe('CommandExecutionProcessController', () => {
  let controller: CommandExecutionProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandExecutionProcessController],
      providers: [CommandExecutionProcessService],
    }).compile();

    controller = module.get<CommandExecutionProcessController>(
      CommandExecutionProcessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
