import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  id: string

  @Field({ description: 'user first name' })
  firstName: string

  @Field({ description: 'user last name', nullable: true })
  lastName?: string

  @Field()
  password: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
