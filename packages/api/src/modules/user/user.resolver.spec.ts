import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from './user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { fakeUsers } from './__mocks__/fakeUsers.js'

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
    const id = fakeUsers[0].id
    it('should return an user', async () => {
      const response = await resolver.findUser(id)

      expect(response).toEqual(fakeUsers[0])
      expect(service.findOne).toHaveBeenCalled()
      expect(service.findOne).toHaveBeenCalledTimes(1)
      expect(service.findOne).toHaveBeenCalledWith({ id })
    })

    it('should return null if no user is found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(null)

      try {
        await resolver.findUser(id)
      } catch (error) {
        expect(error).toEqual(null)
      }

      expect(service.findOne).toHaveBeenCalled()
      expect(service.findOne).toHaveBeenCalledTimes(1)
      expect(service.findOne).toHaveBeenCalledWith({ id })
    })
  })

  describe('allUsers', () => {
    it('should return an array of users', async () => {
      const response = await resolver.allUsers()

      expect(response).toEqual(fakeUsers)
      expect(service.findAll).toHaveBeenCalled()
      expect(service.findAll).toHaveBeenCalledTimes(1)
      expect(response.every((e) => e instanceof User)).toBeTruthy()
    })
  })

  describe('createUser', () => {
    const user = {
      name: fakeUsers[0].name,
      email: fakeUsers[0].email,
    }

    it('should create a new user', async () => {
      const response = await resolver.createUser(user)

      expect({ name: response.name, email: response.email }).toEqual(user)
      expect(service.create).toHaveBeenCalled()
      expect(service.create).toHaveBeenCalledTimes(1)
      expect(service.create).toHaveBeenCalledWith(user)
    })
  })

  describe('updateUser', () => {
    const user = {
      id: fakeUsers[0].id,
      name: fakeUsers[0].name,
      email: fakeUsers[0].email,
    }

    it('should update an user', async () => {
      const response = await resolver.updateUser(user)

      expect({
        id: response.id,
        name: response.name,
        email: response.email,
      }).toEqual(user)
      expect(service.update).toHaveBeenCalled()
      expect(service.update).toHaveBeenCalledTimes(1)
      expect(service.update).toHaveBeenCalledWith(user)
    })

    it('should return NotFoundException when no user is found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException())

      try {
        await resolver.updateUser(user)
      } catch (error) {
        expect(error).toEqual(new NotFoundException())
      }

      expect(service.update).toHaveBeenCalled()
      expect(service.update).toHaveBeenCalledTimes(1)
      expect(service.update).toHaveBeenCalledWith(user)
    })
  })
})
