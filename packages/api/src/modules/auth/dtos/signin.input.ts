import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignInDto {
  @Field()
  email: string

  @Field()
  password: string
}