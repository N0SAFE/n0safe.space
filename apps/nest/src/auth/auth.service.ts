import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService{
    constructor(private readonly prisma: PrismaService){}
    public async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        
        if(!user) throw new ForbiddenException('Credentials incorrect')
        
        const pwMatches = await argon.verify(user.hash, dto.password)
        
        if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
        
        delete user.hash
        return user
    }
    
    public async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            }) 
            delete user.hash
            return user
        }catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
        
    }
}