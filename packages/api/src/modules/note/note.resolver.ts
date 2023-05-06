import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Public } from '../auth/constants'
import { NoteCreateInput } from './dtos/note.create.input'
import { NoteUpdateInput } from './dtos/note.update.input'
import { Note } from './entities/note.entity'
import { NoteService } from './note.service'

@Resolver()
export class NoteResolver {
  constructor(private readonly note: NoteService) {}

  @Query(() => Note)
  findNote(@Args('id') id: string) {
    return this.note.findOne({ id })
  }

  @Public()
  @Query(() => [Note])
  allNotes(@Args('userId') userId: string) {
    return this.note.findAll({ userId })
  }

  @Mutation(() => Note)
  createNote(@Args('data') data: NoteCreateInput) {
    return this.note.create(data)
  }

  @Mutation(() => Note)
  updateNote(@Args('data') data: NoteUpdateInput) {
    return this.note.update(data)
  }

  @Mutation(() => Note)
  deleteNote(@Args('id') id: string) {
    return this.note.delete({ id })
  }
}
