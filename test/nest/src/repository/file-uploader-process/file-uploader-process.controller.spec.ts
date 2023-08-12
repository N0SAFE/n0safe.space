import { Test, TestingModule } from '@nestjs/testing';
import { FileUploaderProcessController } from './file-uploader-process.controller';
import { FileUploaderProcessService } from './file-uploader-process.service';

describe('FileUploaderProcessController', () => {
  let controller: FileUploaderProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploaderProcessController],
      providers: [FileUploaderProcessService],
    }).compile();

    controller = module.get<FileUploaderProcessController>(
      FileUploaderProcessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
