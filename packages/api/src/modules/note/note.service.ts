import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

import { Note } from './note.model'

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.note.findMany()
  }

  findOne(data: Prisma.NoteWhereUniqueInput): Promise<Note | null> {
    const { id } = data

    return this.prisma.note.findUnique({
      where: { id },
    })
  }
}
