import { PrismaService } from '@/providers/prisma.service'
import { randomUUID } from 'crypto'
import { UserService } from './user.service'
import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { fakeUsers } from './__mocks__/fakeUsers.js'

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(fakeUsers[0]),
    findMany: jest.fn().mockResolvedValue(fakeUsers),
    findUnique: jest.fn().mockResolvedValue(fakeUsers[0]),
    update: jest.fn().mockResolvedValue(fakeUsers[0]),
    delete: jest.fn(),
  },
}
describe('UserService', () => {
  let service: UserService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findOne', () => {
    const id = fakeUsers[0].id

    it('should return one user', async () => {
      const response = await prisma.user.findUnique({ where: { id } })

      expect(response).toEqual(fakeUsers[0])
      expect(prisma.user.findUnique).toHaveBeenCalled()
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
      })
    })

    describe('findAll', () => {
      it('should return an array of users', async () => {
        const response = await service.findAll()

        expect(response).toEqual(fakeUsers)
        expect(prisma.user.findMany).toHaveBeenCalled()
        expect(prisma.user.findMany).toHaveBeenCalledTimes(1)
      })
    })

    it('should should return nothing when user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      const response = await prisma.user.findUnique({ where: { id } })

      expect(response).toBeNull()
      expect(prisma.user.findUnique).toHaveBeenCalled()
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should add a new user', async () => {
      const response = prisma.user.create({ data: fakeUsers[0] })

      expect(response).toBe(fakeUsers[0])
      expect(prisma.user.create).toHaveBeenCalled()
      expect(prisma.user.create).toHaveBeenCalledTimes(1)
      expect(prisma.user.create).toHaveBeenCalledWith({ data: fakeUsers[0] })
    })
  })

  describe('update', () => {
    it('should update an user', async () => {
      const id = fakeUsers[0].id
      const response = await prisma.user.update({
        data: fakeUsers[0],
        where: {
          id,
        },
      })

      expect(response).toEqual(fakeUsers[0])
      expect(prisma.user.update).toHaveBeenCalled()
      expect(prisma.user.update).toHaveBeenCalledTimes(1)
      expect(prisma.user.update).toHaveBeenCalledWith({
        data: fakeUsers[0],
        where: {
          id,
        },
      })
    })

    it('should return NotFoundException when no user is found', async () => {
      const unexistingUser = {
        id: randomUUID(),
        email: 'jest2@mail.com',
        name: 'jest2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      jest
        .spyOn(prisma.user, 'update')
        .mockRejectedValue(new NotFoundException())

      try {
        await prisma.user.update({
          data: unexistingUser,
          where: { id: unexistingUser.id },
        })
      } catch (error) {
        expect(error).toEqual(new NotFoundException())
      }
      expect(prisma.user.update).toHaveBeenCalledWith({
        data: unexistingUser,
        where: { id: unexistingUser.id },
      })
    })
  })
})
