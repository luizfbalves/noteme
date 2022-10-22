import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { CreateUsersInput } from 'src/dtos/inputs/create-user-input'
import { Note } from 'src/dtos/models/note-model'
import { Users } from 'src/dtos/models/user-model'

@Resolver(() => Users)
export class UsersResolver {
  @Query(() => [Users])
  async users() {
    const result = {
      name: 'dev',
      password: 'sdhasodasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return [result]
  }
  @Mutation(() => Users)
  async createUser(@Args('data') data: CreateUsersInput) {
    console.log(data)
    const result = {
      id: 'asdasd-asdasdasd-asdasda',
      name: 'dev',
      password: 'sdhasodasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return [result]
  }

  @ResolveField(() => Note)
  async notes(@Parent() user: Users) {
    const { name } = user
    return name
  }
}
