import { Query, Resolver, Args } from '@nestjs/graphql'

import { User } from './user.model'
import { UserService } from './user.service'

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async allUsers() {
    return await this.userService.findAll()
  }

  @Query(() => User)
  async findUser(@Args('id') id: string) {
    return await this.userService.findOne({ id })
  }
}
