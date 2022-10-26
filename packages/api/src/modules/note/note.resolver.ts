import { Resolver, Query, Args } from '@nestjs/graphql'

import { Note } from './note.model'
import { NoteService } from './note.service'

@Resolver()
export class NoteResolver {
  constructor(private readonly note: NoteService) {}

  @Query(() => [Note])
  async allNotes() {
    return await this.note.findAll()
  }

  @Query(() => Note)
  async findNote(@Args('id') id: string) {
    return await this.note.findOne({ id })
  }
}
