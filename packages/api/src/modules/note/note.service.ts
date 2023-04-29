import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../../providers/prisma.service'
import { NoteCreateInput } from './dtos/note.create.input'
import { NoteUpdateInput } from './dtos/note.update.input'

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) { }

  findOne(data: Prisma.NoteWhereUniqueInput) {
    const { id } = data

    return this.prisma.note.findUnique({
      where: { id },
    })
  }

  findAll(data: Prisma.NoteWhereInput) {
    const { userId } = data
    return this.prisma.note.findMany({
      where: { userId },
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
