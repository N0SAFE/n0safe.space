import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileUploaderProcessService } from './file-uploader-process.service';
import { CreateFileUploaderProcessDto } from './dto/create-file-uploader-process.dto';
import { UpdateFileUploaderProcessDto } from './dto/update-file-uploader-process.dto';

@Controller('file-uploader-process')
export class FileUploaderProcessController {
  constructor(
    private readonly fileUploaderProcessService: FileUploaderProcessService,
  ) {}

  @Post()
  create(@Body() createFileUploaderProcessDto: CreateFileUploaderProcessDto) {
    return this.fileUploaderProcessService.create(createFileUploaderProcessDto);
  }

  @Get()
  findAll() {
    return this.fileUploaderProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploaderProcessService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploaderProcessDto: UpdateFileUploaderProcessDto,
  ) {
    return this.fileUploaderProcessService.update(
      +id,
      updateFileUploaderProcessDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploaderProcessService.remove(+id);
  }
}
