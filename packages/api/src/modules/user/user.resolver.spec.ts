import { Context, createMockContext, MockContext } from '@/context'
import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { UserModule } from './user.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

describe('UserResolver', () => {
  let resolver: UserResolver
  let service: UserService
  let mock: MockContext
  let ctx: Context

  beforeEach(async () => {
    mock = createMockContext()
    ctx = mock as unknown as Context

    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    resolver = module.get<UserResolver>(UserResolver)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should add a new user', () => {
    const user = {
      id: randomUUID(),
      email: 'jest@mail.com',
      name: 'jest',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mock.prisma.user.create.mockResolvedValue(user)

    expect(service.create(user, ctx)).resolves.toEqual(user)
    expect(resolver.createUser(user, ctx)).resolves.toEqual(user)
  })

  // describe('findUser', () => {
  //   it('should return one user', async () => {
  //     const id = '3f4bdbfa-165c-4c6a-bfb9-079efc27b5f2'

  //     const result = await resolver.findUser(id)

  //     expect(result).toBeTruthy()
  //   })
  // })

  // describe('allUsers', () => {
  //   it('should return an array of users', async () => {
  //     const result = await resolver.allUsers()

  //     expect(Array.isArray(result)).toBeTruthy()
  //   })
  // })

  // describe('createUser', () => {
  //   it('should add a new user', async () => {
  //     const result = await resolver.createUser({
  //       email: 'jest@mail.com',
  //       name: 'jest',
  //     })

  //     expect(result).toBeTruthy()
  //   })
  // })

  // describe('updateUser', () => {
  //   it('should update a user', async () => {
  //     const result = await resolver.updateUser({
  //       id: '3f4bdbfa-165c-4c6a-bfb9-079efc27b5f2',
  //       email: 'joe@mail.com',
  //       name: 'jest',
  //     })

  //     expect(result).toBeTruthy()
  //   })
  // })
})
