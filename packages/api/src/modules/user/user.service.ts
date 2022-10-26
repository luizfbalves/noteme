import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(data: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const { id } = data
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data })
  }
}
