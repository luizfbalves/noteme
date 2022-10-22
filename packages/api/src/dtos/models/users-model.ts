import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModelUsers {
  @Field()
  name: String;

  @Field()
  password: String;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
