import { Field, InputType } from '@nestjs/graphql'
import { User } from '../user.entity'

@InputType()
export class UserCreateInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  name: string
}
