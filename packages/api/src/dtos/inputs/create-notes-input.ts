import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotesInput {
  @Field()
  id: String;

  @Field({ nullable: true })
  description?: String;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field()
  userId: String;
}
