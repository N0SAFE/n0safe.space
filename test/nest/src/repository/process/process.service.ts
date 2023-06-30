import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Process } from '@prisma/client';

@Injectable()
export class ProcessService {
  constructor(private readonly prisma: PrismaService) {}
  find(id: number) {
    return this.prisma.process.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prisma.process.findMany();
  }

  findBy(payload) {
    return this.prisma.process.findMany(payload);
  }

  findOneBy(payload) {
    return this.prisma.process.findUnique(payload);
  }

  create(createProcessDto: Process) {
    return this.prisma.process.create({
      data: createProcessDto,
    });
  }

  update(id: number, updateProcessDto: Process) {
    return this.prisma.process.update({
      where: {
        id,
      },
      data: updateProcessDto,
    });
  }

  remove(id: number) {
    return this.prisma.process.delete({
      where: {
        id,
      },
    });
  }

  removeMany(ids: number[]) {
    return this.prisma.process.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
