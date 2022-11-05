import { PrismaService } from '../../providers/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { UserCreateInput } from './dtos/user.create.input'
import { UserUpdateInput } from './dtos/user.update.input'
import { Context } from '@/context'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(data: Prisma.UserWhereUniqueInput, ctx: Context) {
    const { id } = data
    return ctx.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  findAll(ctx: Context) {
    return ctx.prisma.user.findMany({ include: { notes: true } })
  }

  create(data: UserCreateInput, ctx: Context) {
    return ctx.prisma.user.create({ data })
  }

  update(data: UserUpdateInput, ctx: Context) {
    const { id } = data
    return ctx.prisma.user.update({
      data,
      where: {
        id,
      },
    })
  }
}
