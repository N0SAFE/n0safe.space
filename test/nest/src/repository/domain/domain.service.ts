import { Injectable } from '@nestjs/common';
import { Domain } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DomainService {
  constructor(private readonly prisma: PrismaService) {}
  find(id: number) {
    return this.prisma.domain.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prisma.domain.findMany();
  }

  findBy(payload) {
    return this.prisma.domain.findMany(payload);
  }

  findOneBy(payload) {
    return this.prisma.domain.findUnique(payload);
  }

  create(createDomainDto: Domain) {
    return this.prisma.domain.create({
      data: createDomainDto,
    });
  }

  update(id: number, updateDomainDto: Domain) {
    return this.prisma.domain.update({
      where: {
        id,
      },
      data: updateDomainDto,
    });
  }

  remove(id: number) {
    return this.prisma.domain.delete({
      where: {
        id,
      },
    });
  }

  removeMany(ids: number[]) {
    return this.prisma.domain.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
