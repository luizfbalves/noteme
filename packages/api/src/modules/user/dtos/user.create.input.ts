import { Field, InputType } from '@nestjs/graphql'
import { User } from '../user.model'

@InputType()
export class UserCreateInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  name: string
}
