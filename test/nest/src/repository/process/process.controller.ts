import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { Process } from '@prisma/client';
import { DeploymentService } from 'src/ci/deployment/deployment.service';

@Controller('process')
export class ProcessController {
  constructor(
    private readonly processService: ProcessService,
    private readonly ciDeployment: DeploymentService,
  ) {}

  @Post()
  create(@Body() createProcessDto: Process) {
    return this.processService.create(createProcessDto);
  }

  @Get()
  findAll() {
    return this.processService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processService.find(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDto: Process) {
    const updatedProcess = this.processService.update(+id, updateProcessDto);

    return updatedProcess;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processService.remove(+id);
  }
}
