import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { UserCreateInput } from './dtos/user.create.input'
import { UserUpdateInput } from './dtos/user.update.input'

import { User } from './user.entity'
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

  @Mutation(() => User)
  createUser(@Args('data') data: UserCreateInput) {
    return this.user.create(data)
  }

  @Mutation(() => User)
  updateUser(@Args('user') data: UserUpdateInput) {
    return this.user.update(data)
  }
}
