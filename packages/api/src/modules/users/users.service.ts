import { PrismaService } from '@/providers/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserInput: CreateUserInput) {
    return this.prisma.users.create({ data: createUserInput })
  }

  findAll() {
    return this.prisma.users.findMany()
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: {
        id
      }
    })
  }

  update(updateUserInput: UpdateUserInput) {
    const { id } = updateUserInput
    return this.prisma.users.update({
      data: updateUserInput, where: {
        id
      }
    })
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: {
        id
      }
    })
  }
}
