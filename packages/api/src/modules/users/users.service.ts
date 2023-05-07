import { Injectable } from '@nestjs/common'

import { hashCreate } from '../../helpers/bcrypt'
import { PrismaService } from '../../providers/prisma.service'
import { CreateUserInput } from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const userInput = createUserInput

    userInput.password = await hashCreate(userInput.password)

    return this.prisma.users.create({ data: userInput })
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
