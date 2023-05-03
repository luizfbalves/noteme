import { PrismaService } from '@/providers/prisma.service'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { JwtAuthGuard } from './jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    JwtModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
