import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignIn {
  @Field()
  email: string

  @Field()
  password: string
}