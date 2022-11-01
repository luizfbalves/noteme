import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/providers/prisma.service'
import { NoteCreateInput } from './dtos/note.create.input'

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  create(data: NoteCreateInput) {
    return this.prisma.note.create({ data })
  }

  findOne(data: Prisma.noteWhereUniqueInput) {
    const { id } = data

    return this.prisma.note.findUnique({
      where: { id },
    })
  }

  findAll() {
    return this.prisma.note.findMany()
  }
}
