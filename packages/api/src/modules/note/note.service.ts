import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/providers/prisma.service'

import { NoteCreateInput } from './dtos/note.create.input'
import { NoteUpdateInput } from './dtos/note.update.input'

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  findOne(data: Prisma.NoteWhereUniqueInput) {
    const { id } = data

    return this.prisma.note.findUnique({
      where: { id },
    })
  }

  findAll() {
    return this.prisma.note.findMany({
      include: { author: true },
    })
  }

  create(data: NoteCreateInput) {
    return this.prisma.note.create({ data })
  }

  update(data: NoteUpdateInput) {
    const { id } = data
    return this.prisma.note.update({
      data,
      where: {
        id,
      },
    })
  }

  delete(data: Prisma.NoteWhereUniqueInput) {
    const { id } = data
    return this.prisma.note.delete({
      where: {
        id,
      },
    })
  }
}
