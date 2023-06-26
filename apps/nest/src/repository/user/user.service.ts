import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    public findBy(payload) {
        return this.prisma.user.findMany(payload);
    }
    
    public findOneBy(payload){
        return this.prisma.user.findUnique(payload)
    }
    
    public findByEmail(email) {
        return this.prisma.user.findUnique({
          where: {
            email,
          },
        });
      }
      
      public findById(id) {
        return this.prisma.user.findUnique({
          where: {
            id,
          },
        });
      }
      
      public async createUser(user) {
        const hash = await argon.hash(user.password)
        delete user.password
        user.hash = hash
        
        return this.prisma.user.create({
          data: user,
        });
      }
}
