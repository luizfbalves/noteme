import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
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
