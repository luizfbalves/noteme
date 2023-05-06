import { hashVerify } from '@/helpers/bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { jwtConstants } from './constants'
import { LoginInput } from './dtos/auth-login.input'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private userService: UsersService) {}

  async login({
    email,
    password,
  }: LoginInput): Promise<{ access_token: string }> {
    const userData = await this.userService.findByEmail(email)

    if (!userData) {
      throw new UnauthorizedException('user not found.')
    }

    const isLogged = await hashVerify(password, userData.password)

    if (!isLogged) {
      throw new UnauthorizedException('password incorrect.')
    }

    const payload = {
      sub: userData.id,
      email: email,
    }

    return {
      access_token: this.jwt.sign(payload, { secret: jwtConstants.secret }),
    }
  }
}
