import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { UserCreateInput } from './dtos/user.create.input'

import { User } from './user.model'
import { UserService } from './user.service'

@Resolver(User)
export class UserResolver {
  constructor(private readonly user: UserService) {}

  @Query(() => [User])
  allUsers() {
    return this.user.findAll()
  }

  @Query(() => User)
  findUser(@Args('id') id: string) {
    return this.user.findOne({ id })
  }

  @Mutation()
  createUser(@Args('data') data: UserCreateInput) {
    return this.user.create(data)
  }
}
