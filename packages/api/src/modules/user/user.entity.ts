import { Note } from '@modules/note/note.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  name?: string

  @Field(() => [Note], { nullable: true })
  notes?: Note[]

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
