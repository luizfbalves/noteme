import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../user/user.model'

@ObjectType()
export class Note {
  @Field()
  id: string

  @Field()
  description: string

  @Field(() => [User])
  userId: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
