import { SetMetadata } from "@nestjs/common"

export const JWT_SECRET = process.env.AUTH_SECRET
export const IS_PUBLIC_KEY = process.env.IS_PUBLIC

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
