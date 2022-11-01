import { Field, ObjectType } from '@nestjs/graphql'
import { Note } from '../note/note.entity'

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
