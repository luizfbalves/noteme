import { hashVerify } from '@/helpers/bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { jwtConstants } from './constants'
import { LoginInput } from './dto/auth-login.input'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private userService: UsersService) {}

  async login(payload: LoginInput): Promise<{ acess_token: string }> {
    const { email, password } = payload

    const userData = await this.userService.findByEmail(email)

    if (!userData) {
      throw new UnauthorizedException('user not found.')
    }

    const isLogged = await hashVerify(password, userData.password)

    if (!isLogged) {
      throw new UnauthorizedException('password incorrect.')
    }

    return {
      acess_token: this.jwt.sign(userData, { secret: jwtConstants.secret }),
    }
  }
}
