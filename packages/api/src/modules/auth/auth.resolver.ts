import { Args, Query, Resolver } from '@nestjs/graphql'

import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { Public } from './constants'
import { LoginInput } from './dto/auth-login.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Query(() => User, { name: 'login' })
  login(
    @Args('LoginInput', { type: () => LoginInput }) loginInput: LoginInput
  ) {
    return this.authService.login(loginInput)
  }
}
