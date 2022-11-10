import { Test, TestingModule } from '@nestjs/testing'
import { NoteResolver } from './note.resolver'
import { NoteService } from './note.service'
import { fakeNotes } from './__mocks__/fakeNotes.js'

const serviceMock = {
  findOne: jest.fn().mockReturnValue(fakeNotes[0]),
  findAll: jest.fn().mockResolvedValue(fakeNotes),
  create: jest.fn().mockReturnValue(fakeNotes[0]),
  update: jest.fn().mockReturnValue(fakeNotes[0]),
  delete: jest.fn().mockReturnValue(fakeNotes[0]),
}

describe('NoteResolver', () => {
  let service: NoteService
  let resolver: NoteResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteResolver,
        { provide: NoteService, useValue: serviceMock },
      ],
    }).compile()

    service = module.get<NoteService>(NoteService)
    resolver = module.get<NoteResolver>(NoteResolver)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findNote', () => {
    const { id } = fakeNotes[0]
    it('should return an note', async () => {
      const response = await resolver.findNote(id)

      expect(response).toEqual(fakeNotes[0])
      expect(service.findOne).toHaveBeenCalled()
      expect(service.findOne).toHaveBeenCalledTimes(1)
      expect(service.findOne).toHaveBeenCalledWith({ id })
    })

    it('should return null if no user is found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(null)

      try {
        await resolver.findNote(id)
      } catch (error) {
        expect(error).toEqual(null)
      }

      expect(service.findOne).toHaveBeenCalled()
      expect(service.findOne).toHaveBeenCalledTimes(1)
      expect(service.findOne).toHaveBeenCalledWith({ id })
    })
  })
})
