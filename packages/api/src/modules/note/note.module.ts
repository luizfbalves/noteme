import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { NoteResolver } from './note.resolver'
import { NoteService } from './note.service'

@Module({
  providers: [NoteResolver, NoteService, PrismaService],
})
export class NoteModule {}
