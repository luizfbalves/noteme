import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(data: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        id: data.id,
      },
    })

    if (!user) {
      throw new Error('user not found')
    }

    return user
  }
}
