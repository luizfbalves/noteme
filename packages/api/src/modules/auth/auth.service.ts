import { verifyHash } from '@/helpers/bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from './../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }

    const isValid = await verifyHash(password, user.password)

    if (!isValid) {
      throw new UnauthorizedException()
    }

    const { password: pass, ...result } = user

    return result
  }

  async login(user: any): Promise<{ acess_token: string }> {
    const payload = { username: user.username, sub: user.userId }

    return {
      acess_token: this.jwt.sign(payload),
    }
  }
}
