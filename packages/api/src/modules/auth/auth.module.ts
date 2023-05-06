import { PrismaService } from '@/providers/prisma.service'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
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
