import { Module } from '@nestjs/common'

import { PrismaService } from '../../providers/prisma.service'
import { AuthModule } from '../auth/auth.module'
import { NoteResolver } from './note.resolver'
import { NoteService } from './note.service'

@Module({
  providers: [NoteResolver, NoteService, PrismaService, AuthModule],
})
export class NoteModule {}
