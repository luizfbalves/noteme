import { PrismaService } from '@/providers/prisma.service'
import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [UsersResolver, UsersService, PrismaService, AuthModule],
})
export class UsersModule {}
