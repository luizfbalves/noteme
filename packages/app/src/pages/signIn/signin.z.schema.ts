import { z } from 'zod'

export const UserZod = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'password too short' })
}).required()