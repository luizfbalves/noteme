import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateInput {
  @Field()
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  email: string

  @Field({ defaultValue: new Date() })
  updatedAt: Date
}
