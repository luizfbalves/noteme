import { z } from 'zod'

export const ConfirmPasswordSchema = z.object({
  password: z.string().min(6, { message: 'password too short' }),
  confirm: z.string().min(6, { message: 'password too short' })
}).required().refine((value) => value.password === value.confirm, {
  message: 'passwords do not match!'
})