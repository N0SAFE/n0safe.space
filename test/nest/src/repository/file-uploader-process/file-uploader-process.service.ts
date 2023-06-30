import { Injectable } from '@nestjs/common';
import { CreateFileUploaderProcessDto } from './dto/create-file-uploader-process.dto';
import { UpdateFileUploaderProcessDto } from './dto/update-file-uploader-process.dto';

@Injectable()
export class FileUploaderProcessService {
  create(createFileUploaderProcessDto: CreateFileUploaderProcessDto) {
    return 'This action adds a new fileUploaderProcess';
  }

  findAll() {
    return `This action returns all fileUploaderProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUploaderProcess`;
  }

  update(
    id: number,
    updateFileUploaderProcessDto: UpdateFileUploaderProcessDto,
  ) {
    return `This action updates a #${id} fileUploaderProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUploaderProcess`;
  }
}
