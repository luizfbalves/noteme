import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Note {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  description?: string


  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
