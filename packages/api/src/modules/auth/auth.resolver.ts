import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Public } from './constants';
import { SignInDto } from './dtos/signin.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: SignInDto) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }
}
