import { Field, InputType } from '@nestjs/graphql'

import { Note } from '../entities/note.entity'

@InputType()
export class NoteCreateInputDto implements Partial<Note> {
  @Field()
  userId: string

  @Field({ nullable: true })
  description: string
}
