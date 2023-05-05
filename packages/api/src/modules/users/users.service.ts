import { PrismaService } from '@/providers/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreateUserInput } from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.users.create({ data: createUserInput })
  }

  findAll() {
    return this.prisma.users.findMany()
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    })
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    })
  }

  update(updateUserInput: UpdateUserInput) {
    const { id } = updateUserInput
    return this.prisma.users.update({
      data: updateUserInput,
      where: {
        id,
      },
    })
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: {
        id,
      },
    })
  }
}
