import { Test, TestingModule } from '@nestjs/testing';
import { FileRewriteProcessController } from './file-rewrite-process.controller';
import { FileRewriteProcessService } from './file-rewrite-process.service';

describe('FileRewriteProcessController', () => {
  let controller: FileRewriteProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileRewriteProcessController],
      providers: [FileRewriteProcessService],
    }).compile();

    controller = module.get<FileRewriteProcessController>(
      FileRewriteProcessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
