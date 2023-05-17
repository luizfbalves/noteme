import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { PrismaService } from '../../providers/prisma.service'
import { UsersService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    PrismaService,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
