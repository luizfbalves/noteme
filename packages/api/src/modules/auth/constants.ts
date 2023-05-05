import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
}

export const IS_PUBLIC_KEY = 'isPublic'

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  }
)

//TODO fix current user not providing user data
