import { PrismaService } from '@/providers/prisma.service'
import { Module } from '@nestjs/common'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserService, UserResolver, PrismaService],
})
export class UserModule {}
