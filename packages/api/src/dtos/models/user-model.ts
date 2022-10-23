import { Field, ObjectType } from '@nestjs/graphql'

import { Note } from './note-model'

@ObjectType()
export class Users {
  @Field(() => String, { description: 'id of the user' })
  id: string

  @Field()
  name: string

  @Field()
  password: string

  @Field(() => [Users])
  notes: Note[]

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
