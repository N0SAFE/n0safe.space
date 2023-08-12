import { Test, TestingModule } from '@nestjs/testing';
import { FileRewriteProcessService } from './file-rewrite-process.service';

describe('FileRewriteProcessService', () => {
  let service: FileRewriteProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileRewriteProcessService],
    }).compile();

    service = module.get<FileRewriteProcessService>(FileRewriteProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
