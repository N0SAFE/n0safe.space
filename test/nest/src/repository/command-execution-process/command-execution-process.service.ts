import { Injectable } from '@nestjs/common';
import { CreateCommandExecutionProcessDto } from './dto/create-command-execution-process.dto';
import { UpdateCommandExecutionProcessDto } from './dto/update-command-execution-process.dto';

@Injectable()
export class CommandExecutionProcessService {
  create(createCommandExecutionProcessDto: CreateCommandExecutionProcessDto) {
    return 'This action adds a new commandExecutionProcess';
  }

  findAll() {
    return `This action returns all commandExecutionProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commandExecutionProcess`;
  }

  update(
    id: number,
    updateCommandExecutionProcessDto: UpdateCommandExecutionProcessDto,
  ) {
    return `This action updates a #${id} commandExecutionProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} commandExecutionProcess`;
  }
}
