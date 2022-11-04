import { Context, createMockContext, MockContext } from '@/context'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('findUser', () => {
    it('should return one user', async () => {
      const id = '3f4bdbfa-165c-4c6a-bfb9-079efc27b5f2'

      const result = await resolver.findUser(id)

      expect(result).toBeTruthy()
    })
  })

  describe('allUsers', () => {
    it('should return an array of users', async () => {
      const result = await resolver.allUsers()

      expect(Array.isArray(result)).toBeTruthy()
    })
  })

  describe('createUser', () => {
    it('should add a new user', async () => {
      const result = await resolver.createUser({
        email: 'jest@mail.com',
        name: 'jest',
      })

      expect(result).toBeTruthy()
    })
  })

  describe('updateUser', () => {
    it('should update a user', async () => {
      const result = await resolver.updateUser({
        id: '3f4bdbfa-165c-4c6a-bfb9-079efc27b5f2',
        email: 'joe@mail.com',
        name: 'jest',
      })

      expect(result).toBeTruthy()
    })
  })
})
