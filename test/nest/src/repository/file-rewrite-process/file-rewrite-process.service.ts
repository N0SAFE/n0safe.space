import { Injectable } from '@nestjs/common';
import { CreateFileRewriteProcessDto } from './dto/create-file-rewrite-process.dto';
import { UpdateFileRewriteProcessDto } from './dto/update-file-rewrite-process.dto';

@Injectable()
export class FileRewriteProcessService {
  create(createFileRewriteProcessDto: CreateFileRewriteProcessDto) {
    return 'This action adds a new fileRewriteProcess';
  }

  findAll() {
    return `This action returns all fileRewriteProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileRewriteProcess`;
  }

  update(id: number, updateFileRewriteProcessDto: UpdateFileRewriteProcessDto) {
    return `This action updates a #${id} fileRewriteProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileRewriteProcess`;
  }
}
