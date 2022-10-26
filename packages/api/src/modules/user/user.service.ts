import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(data: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const { id } = data
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }
}
