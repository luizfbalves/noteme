import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { ModelNotes } from './notes-model'

@Entity()
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  password: string

  @Column()
  @Field(() => [Users])
  notes: ModelNotes[]

  @Column()
  @Field()
  createdAt: Date

  @Column()
  @Field({ nullable: true })
  updatedAt?: Date
}
