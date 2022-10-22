import { Field, ObjectType } from '@nestjs/graphql'

import { ModelNotes } from './notes-model'

@ObjectType()
export class ModelUsers {
  @Field()
  name: string

  @Field()
  password: string

  @Field(() => [ModelUsers])
  notes: ModelNotes[]

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
