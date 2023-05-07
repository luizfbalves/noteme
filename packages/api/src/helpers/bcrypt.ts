import { UnauthorizedException } from '@nestjs/common'
import bcrypt from 'bcrypt'

export async function hashCreate(password: string) {
  if (!password) {
    throw new UnauthorizedException()
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

export async function hashVerify(password: string, hash: string) {
  if (!password || !hash) {
    throw new UnauthorizedException()
  }

  return await bcrypt.compare(password, hash)
}
