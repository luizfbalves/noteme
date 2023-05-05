import { Args, Query, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { Public } from './constants'
import { LoginInput } from './dtos/auth-login.input'
import { Auth } from './entities/auth.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Query(() => Auth, { name: 'login' })
  async login(@Args('LoginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput)
  }
}
