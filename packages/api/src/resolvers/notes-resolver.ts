import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class NotesResolver {
  @Query(() => String)
  async getAll() {
    return 'all notes returned';
  }
}
