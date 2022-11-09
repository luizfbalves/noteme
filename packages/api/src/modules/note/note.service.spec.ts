import { PrismaService } from '@/providers/prisma.service'
import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'node:crypto'
import { Note } from './note.entity'
import { NoteService } from './note.service'
import { fakeNotes } from './__mocks__/fakeNotes.js'

const prismaMock = {
  note: {
    findUnique: jest.fn().mockResolvedValue(fakeNotes[0]),
    findMany: jest.fn().mockResolvedValue(fakeNotes),
    create: jest.fn().mockReturnValue(fakeNotes[0]),
    update: jest.fn().mockResolvedValue(fakeNotes[0]),
    delete: jest.fn().mockResolvedValue([]),
  },
}

describe('NoteService', () => {
  let note: NoteService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    note = module.get<NoteService>(NoteService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findOne', () => {
    it('should return an note', async () => {
      const { id } = fakeNotes[0]
      const response = await prisma.note.findUnique({ where: { id } })

      expect(response).toEqual(fakeNotes[0])
      expect(prisma.note.findUnique).toHaveBeenCalled()
      expect(prisma.note.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.note.findUnique).toHaveBeenCalledWith({ where: { id } })
      expect(response instanceof Note).toBeTruthy()
    })

    it('should return NotFoundException if no note is found', async () => {
      const id = randomUUID()
      jest
        .spyOn(prisma.note, 'findUnique')
        .mockRejectedValue(new NotFoundException())

      try {
        await prisma.note.findUnique({ where: { id } })
      } catch (error) {
        expect(error).toEqual(new NotFoundException())
      }
    })
  })

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const response = await prisma.note.findMany()

      expect(response).toEqual(fakeNotes)
      expect(prisma.note.findMany).toHaveBeenCalled()
      expect(prisma.note.findMany).toHaveBeenCalledTimes(1)
      expect(response instanceof Array<Note>).toBeTruthy()
    })
  })

  describe('update', () => {
    it('should update an note', async () => {
      const { id } = fakeNotes[0]

      const response = await prisma.note.update({
        data: fakeNotes[0],
        where: id,
      })

      expect(response).toEqual(fakeNotes[0])
      expect(prisma.note.update).toHaveBeenCalled()
      expect(prisma.note.update).toHaveBeenCalledTimes(1)
      expect(prisma.note.update).toHaveBeenCalledWith({
        data: fakeNotes[0],
        where: id,
      })
      expect(response instanceof Note).toBeTruthy()
    })
  })

  describe('delete', () => {
    it('should delete an note', async () => {
      const { id } = fakeNotes[0]
      const response = await prisma.note.delete({ where: { id } })

      expect(response).toEqual([])
      expect(prisma.note.delete).toHaveBeenCalled()
      expect(prisma.note.delete).toHaveBeenCalledTimes(1)
      expect(prisma.note.delete).toHaveBeenCalledWith({
        where: { id },
      })
    })
  })
})
