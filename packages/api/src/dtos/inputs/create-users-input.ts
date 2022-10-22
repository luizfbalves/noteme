import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUsersInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
