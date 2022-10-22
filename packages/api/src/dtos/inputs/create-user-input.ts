import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUsersInput {
  @Field()
  name: string

  @Field()
  password: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
