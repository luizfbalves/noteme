import { Context } from '@/context'
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'

import { UserCreateInput } from './dtos/user.create.input'
import { UserUpdateInput } from './dtos/user.update.input'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly user: UserService) {}

  @Query(() => User)
  findUser(@Args('id') id: string, ctx: Context) {
    return this.user.findOne({ id }, ctx)
  }

  @Query(() => [User])
  allUsers(ctx: Context) {
    return this.user.findAll(ctx)
  }

  @Mutation(() => User)
  createUser(@Args('data') data: UserCreateInput, ctx: Context) {
    return this.user.create(data, ctx)
  }

  @Mutation(() => User)
  updateUser(@Args('user') data: UserUpdateInput, ctx: Context) {
    return this.user.update(data, ctx)
  }
}
