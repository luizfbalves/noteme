import { PrismaService } from '@/providers/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'node:crypto'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService],
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
