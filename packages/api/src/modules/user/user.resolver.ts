import { Query, Resolver, Args } from '@nestjs/graphql'

import { User } from './user.model'
import { UserService } from './user.service'

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async oneUser(@Args('data') data: User) {
    const { id } = data
    return await this.userService.findOne({ id })
  }

  async allUsers() {
    return await this.userService.findAll()
  }
}
