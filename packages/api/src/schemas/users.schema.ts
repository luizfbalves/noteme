import { Field, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
