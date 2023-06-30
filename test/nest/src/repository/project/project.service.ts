import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}
  find(id: number) {
    return this.prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findBy(payload) {
    return this.prisma.project.findMany(payload);
  }

  findOneBy(payload) {
    return this.prisma.project.findUnique(payload);
  }

  create(createProjectDto: Project) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  update(id: number, updateProjectDto: Project) {
    return this.prisma.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  remove(id: number) {
    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }

  removeMany(ids: number[]) {
    return this.prisma.project.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
