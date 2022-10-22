import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateNotesInput } from 'src/dtos/inputs/create-note-input'
import { Note } from 'src/dtos/models/note-model'

@Resolver()
export class NotesResolver {
  @Query(() => [Note])
  async notes() {
    const result: Note = {
      id: 'asdlasdasd-asdasda-sdas',
      description: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'sdasdjasd-sdapsdja-sdsds',
    }
    return [result]
  }

  @Mutation(() => Note)
  async createNote(@Args('data') data: CreateNotesInput) {
    console.log(data)
  }
}
