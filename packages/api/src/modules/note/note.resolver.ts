import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { NoteCreateInput } from './dtos/note.create.input'
import { NoteUpdateInput } from './dtos/note.update.input'

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

  @Mutation(() => Note)
  createNote(@Args('data') data: NoteCreateInput) {
    return this.note.create(data)
  }

  @Mutation(() => Note)
  updateNote(@Args('data') data: NoteUpdateInput) {
    return this.note.update(data)
  }
}
