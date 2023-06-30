import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandExecutionProcessService } from './command-execution-process.service';
import { CreateCommandExecutionProcessDto } from './dto/create-command-execution-process.dto';
import { UpdateCommandExecutionProcessDto } from './dto/update-command-execution-process.dto';

@Controller('command-execution-process')
export class CommandExecutionProcessController {
  constructor(
    private readonly commandExecutionProcessService: CommandExecutionProcessService,
  ) {}

  @Post()
  create(
    @Body() createCommandExecutionProcessDto: CreateCommandExecutionProcessDto,
  ) {
    return this.commandExecutionProcessService.create(
      createCommandExecutionProcessDto,
    );
  }

  @Get()
  findAll() {
    return this.commandExecutionProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandExecutionProcessService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommandExecutionProcessDto: UpdateCommandExecutionProcessDto,
  ) {
    return this.commandExecutionProcessService.update(
      +id,
      updateCommandExecutionProcessDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandExecutionProcessService.remove(+id);
  }
}
