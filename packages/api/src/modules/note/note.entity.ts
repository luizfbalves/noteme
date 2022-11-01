import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../user/user.entity'

@ObjectType()
export class Note {
  @Field()
  id: string

  @Field({ nullable: true })
  description?: string

  @Field(() => User)
  author: User

  @Field()
  userId: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
