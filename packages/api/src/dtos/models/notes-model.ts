import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModelNotes {
  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field()
  userId: string;
}
