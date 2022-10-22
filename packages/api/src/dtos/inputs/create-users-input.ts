import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUsersInput {
  @Field()
  id: String;

  @Field()
  name: String;

  @Field()
  password: String;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
