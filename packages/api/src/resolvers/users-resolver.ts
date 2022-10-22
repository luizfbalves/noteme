import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUsersInput } from 'src/dtos/inputs/create-users-input';
import { ModelUsers } from 'src/dtos/models/users-model';

@Resolver()
export class UsersResolver {
  @Query(() => [ModelUsers])
  async users() {
    const result = {
      name: 'dev',
      password: 'sdhasodasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return [result];
  }
  @Mutation(() => ModelUsers)
  async createUser(@Args('data') data: CreateUsersInput) {
    const result = {
      id: 'asdasd-asdasdasd-asdasda',
      name: 'dev',
      password: 'sdhasodasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return [result];
  }
}
