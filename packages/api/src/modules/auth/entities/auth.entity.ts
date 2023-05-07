import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth {
  @Field()
  access_token: string
}
