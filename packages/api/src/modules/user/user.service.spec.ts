import { Test, TestingModule } from '@nestjs/testing'
import { UserModule } from './user.module'

import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // describe('findOne', () => {
  //   it('should return one user', async () => {
  //     const id = '3f4bdbfa-165c-4c6a-bfb9-079efc27b5f2'

  //     const result = await service.findOne({ id })

  //     expect(result).toBeTruthy()
  //   })
  // })

  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     const result = await service.findAll()

  //     expect(Array.isArray(result)).toBeTruthy()
  //   })
  // })

  // describe('create', () => {
  //   it('should add a new user', async () => {
  //     const result = await service.create({
  //       email: 'jest@mail.com',
  //       name: 'jest',
  //     })

  //     expect(result).toBeTruthy()
  //   })
  // })

  // describe('update', () => {
  //   it('should update a user', async () => {
  //     const result = await service.update({
  //       id: randomUUID(),
  //       email: 'jest@mail.com',
  //       name: 'jest',
  //     })

  //     expect(result).toBeTruthy()
  //   })
  // })
})
