import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  password: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt?: Date

  @Field({ nullable: true })
  token?: string
}
