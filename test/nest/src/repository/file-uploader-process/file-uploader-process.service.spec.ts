import { Test, TestingModule } from '@nestjs/testing';
import { FileUploaderProcessService } from './file-uploader-process.service';

describe('FileUploaderProcessService', () => {
  let service: FileUploaderProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploaderProcessService],
    }).compile();

    service = module.get<FileUploaderProcessService>(
      FileUploaderProcessService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
