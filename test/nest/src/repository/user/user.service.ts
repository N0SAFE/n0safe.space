import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  public find(id): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public findBy(payload): Promise<User[]> {
    return this.prisma.user.findMany(payload);
  }

  public findOneBy(payload): Promise<User> {
    return this.prisma.user.findUnique(payload);
  }

  public findOneByEmail(email): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async create(user: CreateUserDto): Promise<User> {
    const hash = await argon.hash(user.password);
    delete user.password;
    user.hash = hash;

    return this.prisma.user.create({
      data: user,
    });
  }

  public async update(id: number, user: UpdateUserDto): Promise<User> {
    delete user.hash;
    if (user.password) {
      const hash = await argon.hash(user.password);
      delete user.password;
      user.hash = hash;
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  public async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  public async removeMany(ids: number[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
