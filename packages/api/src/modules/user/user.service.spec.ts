import { Context, createMockContext, MockContext } from '@/context'
import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'node:crypto'
import { UserModule } from './user.module'

import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  let mock: MockContext
  let ctx: Context

  beforeEach(async () => {
    mock = createMockContext()
    ctx = mock as unknown as Context

    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOne', () => {
    it('should return one user', () => {
      const user = {
        id: randomUUID(),
        email: 'jest@mail.com',
        name: 'jest',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mock.prisma.user.findUnique.mockResolvedValue(user)

      expect(service.findOne({ id: user.id }, ctx)).resolves.toEqual(user)
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: randomUUID(),
          email: 'jest@mail.com',
          name: 'jest',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: randomUUID(),
          email: 'jest@mail.com',
          name: 'jest',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      mock.prisma.user.findMany.mockResolvedValue(users)

      expect(service.findAll(ctx)).resolves.toEqual(users)
    })
  })

  describe('create', () => {
    it('should add a new user', async () => {
      const user = {
        id: randomUUID(),
        email: 'jest@mail.com',
        name: 'jest',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mock.prisma.user.create.mockResolvedValue(user)

      expect(service.create(user, ctx)).resolves.toEqual(user)
    })
  })

  describe('update', () => {
    it('should update a user', async () => {
      const user = {
        id: randomUUID(),
        email: 'jest@mail.com',
        name: 'jest',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mock.prisma.user.update.mockResolvedValue(user)

      expect(service.update(user, ctx)).resolves.toEqual(user)
    })
  })
})
