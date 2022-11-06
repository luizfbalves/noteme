import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

const fakeUsers: User[] = [
  {
    id: randomUUID(),
    email: 'jest1@mail.com',
    name: 'jest1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: randomUUID(),
    email: 'jest2@mail.com',
    name: 'jest2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: randomUUID(),
    email: 'jest2@mail.com',
    name: 'jest2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const serviceMock = {
  findAll: jest.fn().mockResolvedValue(fakeUsers),
  findOne: jest.fn().mockReturnValue(fakeUsers[0]),
  create: jest.fn().mockReturnValue(fakeUsers[0]),
  update: jest.fn().mockReturnValue(fakeUsers[0]),
}

describe('UserResolver', () => {
  let resolver: UserResolver
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: serviceMock },
      ],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
    service = module.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findUser', () => {
    it('should return an user', async () => {
      const id = fakeUsers[0].id
      const response = await resolver.findUser(id)

      expect(response).toEqual(fakeUsers[0])
      expect(service.findOne).toHaveBeenCalled()
      expect(service.findOne).toHaveBeenCalledTimes(1)
      expect(service.findOne).toHaveBeenCalledWith({ id })
    })
  })
})
