import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

import { Note } from './note.model'

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.note.findMany()
  }

  async findOne(data: Prisma.NoteWhereUniqueInput): Promise<Note | null> {
    const { id } = data

    return await this.prisma.note.findUnique({
      where: { id },
    })
  }
}
