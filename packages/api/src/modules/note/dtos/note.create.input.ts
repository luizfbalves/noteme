import { Field, InputType } from '@nestjs/graphql'
import { Note } from '../note.entity'

@InputType()
export class NoteCreateInput implements Partial<Note> {
  @Field()
  description?: string

  @Field()
  userId: string
}
