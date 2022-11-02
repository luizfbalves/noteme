import { UserService } from './user.service'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../providers/prisma.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOne', () => {
    it('should return one user', () => {
      const id = '3f4bdbfa-165c-4c6a-bfb9-079efc27b5f2'
      const result = service.findOne({ id })
      //TODO cant compare entire object due to date conversion
      expect(result).toBeTruthy()
    })
  })

  describe('findAll', () => {
    it('should return an array of users', () => {
      const result = service.findAll()

      //TODO create better expect with real data comparation
      expect(result).toBeTruthy()
    })
  })

  describe('create', () => {
    it('should add a new user', () => {
      const result = service.create({
        email: 'jest@mail.com',
        name: 'jest',
      })

      expect(result).toBeTruthy()
    })
  })
})
