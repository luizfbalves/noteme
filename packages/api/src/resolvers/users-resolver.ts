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
import { ModelUsers } from 'src/dtos/models/users-model'

@Resolver(() => ModelUsers)
export class UsersResolver {
  @Query(() => [ModelUsers])
  async users() {
    const result = {
      name: 'dev',
      password: 'sdhasodasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return [result]
  }
  @Mutation(() => ModelUsers)
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
  async notes(@Parent() user: ModelUsers) {
    const { name } = user
    return name
  }
}
