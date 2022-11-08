import { PrismaService } from '@/providers/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
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
    })
  })
})
