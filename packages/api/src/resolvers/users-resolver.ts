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
import { User } from 'src/dtos/models/user-model'

@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  async users() {
    const result = {
      name: 'dev',
      password: 'sdhasodasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return [result]
  }
  @Mutation(() => User)
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
  async notes(@Parent() user: User) {
    const { name } = user
    return name
  }
}
