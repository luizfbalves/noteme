import { Test, TestingModule } from '@nestjs/testing'
import { Note } from './note.entity'
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

  beforeAll(async () => {
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

  describe('allNotes', () => {
    it('should return an array of notes', async () => {
      const response = await resolver.allNotes()

      expect(response).toEqual(fakeNotes)
      expect(service.findAll).toHaveBeenCalled()
      expect(service.findAll).toHaveBeenCalledTimes(1)
      expect(response.every((e) => e instanceof Note)).toBeTruthy()
    })
  })

  describe('updateNote', () => {
    it('should update an note', async () => {
      const newNote = {
        id: fakeNotes[0],
        description: 'updating a note on resolver',
      }
      const response = await resolver.updateNote(newNote)

      expect(response).toEqual(fakeNotes[0])
      expect(service.update).toHaveBeenCalled()
      expect(service.update).toHaveBeenCalledTimes(1)
      expect(service.update).toHaveBeenCalledWith(newNote)
    })
  })

  describe('deleteNote', () => {
    it('should delete an note', async () => {
      const { id } = fakeNotes[0]

      await resolver.deleteNote(id)

      expect(service.delete).toHaveBeenCalled()
      expect(service.delete).toHaveBeenCalledTimes(1)
      expect(service.delete).toHaveBeenCalledWith({ id })
    })
  })
})
