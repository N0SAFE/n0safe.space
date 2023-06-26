import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService){}
    findBy(payload) {
        return this.prisma.refreshToken.findMany(payload);
    }
    
    findOneBy(payload){
        return this.prisma.refreshToken.findUnique(payload)
    }
    
    findByUserId(userId) {
        return this.prisma.refreshToken.findMany({
            where: {
                userId
            }
        });
    }
    
    isRevoked(id) {
        return this.prisma.refreshToken.findUnique({
            where: {
                id
            },
            select: {
                revoked: true
            }
        }).then(({revoked}) => revoked)
    }
    
    findActiveByUserId(userId) {
        return this.prisma.refreshToken.findMany({
            where: {
                userId,
                revoked: false
            }
        });
    }
    
    findById(id) {
        return this.prisma.refreshToken.findUnique({
            where: {
                id,
            },
        });
    }
    
    revokeByUserId(userId){
        return this.prisma.refreshToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        })
    }
    
    revoke(id) {
        return this.prisma.refreshToken.update({
            where: {
                id
            },
            data: {
                revoked: true
            }
        })
    }
    
    async addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
        return this.prisma.refreshToken.create({
          data: {
            id: jti,
            hashedToken: await this.jwt.hashToken(refreshToken),
            userId
          },
        });
      }
}
