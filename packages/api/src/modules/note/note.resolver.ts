import { Resolver, Query, Args } from '@nestjs/graphql'

import { Note } from './note.entity'
import { NoteService } from './note.service'

@Resolver()
export class NoteResolver {
  constructor(private readonly note: NoteService) {}

  @Query(() => [Note])
  allNotes() {
    return this.note.findAll()
  }

  @Query(() => Note)
  findNote(@Args('id') id: string) {
    return this.note.findOne({ id })
  }
}
