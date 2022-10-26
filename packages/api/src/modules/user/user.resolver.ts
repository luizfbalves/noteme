import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { UserCreateInput } from './dtos/user.create.input'

import { User } from './user.model'
import { UserService } from './user.service'

@Resolver(User)
export class UserResolver {
  constructor(private readonly user: UserService) {}

  @Query(() => [User])
  async allUsers() {
    return await this.user.findAll()
  }

  @Query(() => User)
  async findUser(@Args('id') id: string) {
    return await this.user.findOne({ id })
  }

  @Mutation()
  async createUser(@Args('data') data: UserCreateInput) {
    return await this.user.create(data)
  }
}
