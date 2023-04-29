import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from '@/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(email: string, password: string): Promise<{ acess_token: string }> {

    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('user not found')
    }

    const { password: hashedPassword } = user

    const result = await compare(hashedPassword, password)

    if (!result) {
      throw new UnauthorizedException('password not match')
    }

    const payload = {
      sub: user.id,
      email: user.email
    }

    return {
      acess_token: await this.jwtService.signAsync(payload)
    }
  }
}

