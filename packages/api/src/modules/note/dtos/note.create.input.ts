import { Field, InputType } from '@nestjs/graphql'
import { Note } from '../note.entity'

@InputType()
export class NoteCreateInput {
  @Field()
  userId: string

  @Field({ nullable: true })
  description?: string
}
