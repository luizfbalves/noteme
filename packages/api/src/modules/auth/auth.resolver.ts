import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service';
import { Public } from './constants';
import { SignIn } from './dtos/signin.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Query(() => User, { name: 'signin' })
  signIn(@Args('SignIn') SignIn: SignIn) {
    const { email, password } = SignIn;
    return this.authService.signIn(email, password);
  }
}
