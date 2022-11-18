import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NoteUpdateInput {
  @Field()
  id: string

  @Field({ nullable: true })
  description?: string
}
