import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../../providers/prisma.service'
import { UserCreateInput } from './dtos/user.create.input'
import { UserUpdateInput } from './dtos/user.update.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(data: Prisma.UserWhereUniqueInput) {
    const { id } = data
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany({ include: { notes: true } })
  }

  create(data: UserCreateInput) {
    return this.prisma.user.create({ data })
  }

  update(data: UserUpdateInput) {
    const { id } = data
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    })
  }
}
