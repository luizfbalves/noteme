import { InputType, Field, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string

  @Field()
  email?: string;

  @Field()
  name?: string;


  @Field({ defaultValue: new Date() })
  updatedAt: Date
}
