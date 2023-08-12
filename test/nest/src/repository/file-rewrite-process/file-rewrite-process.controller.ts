import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileRewriteProcessService } from './file-rewrite-process.service';
import { CreateFileRewriteProcessDto } from './dto/create-file-rewrite-process.dto';
import { UpdateFileRewriteProcessDto } from './dto/update-file-rewrite-process.dto';

@Controller('file-rewrite-process')
export class FileRewriteProcessController {
  constructor(
    private readonly fileRewriteProcessService: FileRewriteProcessService,
  ) {}

  @Post()
  create(@Body() createFileRewriteProcessDto: CreateFileRewriteProcessDto) {
    return this.fileRewriteProcessService.create(createFileRewriteProcessDto);
  }

  @Get()
  findAll() {
    return this.fileRewriteProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileRewriteProcessService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileRewriteProcessDto: UpdateFileRewriteProcessDto,
  ) {
    return this.fileRewriteProcessService.update(
      +id,
      updateFileRewriteProcessDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileRewriteProcessService.remove(+id);
  }
}
