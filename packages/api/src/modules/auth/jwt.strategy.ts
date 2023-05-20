import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from 'jsonwebtoken'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email }
  }
}
