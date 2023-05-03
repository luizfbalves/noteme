import { PrismaService } from '@/providers/prisma.service'
import { Module } from '@nestjs/common'

import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
})
export class UsersModule {}
