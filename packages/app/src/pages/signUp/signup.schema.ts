import { z } from 'zod'

export const UserSignUpSchema = z.object({
  username: z.string().min(3, { message: 'Username too short' }),
  email: z.string().email(),
  password: z.string().min(6, { message: 'password too short' })
}).required()