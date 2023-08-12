import { Test, TestingModule } from '@nestjs/testing';
import { CommandExecutionProcessService } from './command-execution-process.service';

describe('CommandExecutionProcessService', () => {
  let service: CommandExecutionProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandExecutionProcessService],
    }).compile();

    service = module.get<CommandExecutionProcessService>(
      CommandExecutionProcessService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
