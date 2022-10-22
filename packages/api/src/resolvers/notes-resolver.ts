import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateNotesInput } from 'src/dtos/inputs/create-notes-input';
import { ModelNotes } from 'src/dtos/models/notes-model';

@Resolver()
export class NotesResolver {
  @Query(() => [ModelNotes])
  async notes() {
    const result: ModelNotes = {
      description: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'sdasdjasd-sdapsdja-sdsds',
    };
    return [result];
  }

  @Mutation(() => ModelNotes)
  async createNote(@Args('data') data: CreateNotesInput) {}
}
