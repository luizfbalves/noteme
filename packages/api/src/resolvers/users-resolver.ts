import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { CreateUsersInput } from 'src/dtos/inputs/create-users-input'
import { ModelNotes } from 'src/dtos/models/notes-model'
import { Users } from 'src/dtos/models/users-model'

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

  @ResolveField(() => ModelNotes)
  async notes(@Parent() user: Users) {
    const { name } = user
    return name
  }
}
