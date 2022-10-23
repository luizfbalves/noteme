import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotesInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field()
  userId: string;
}
