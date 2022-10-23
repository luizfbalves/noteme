import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { Note } from './note-model'

@Entity()
@ObjectType()
export class User {
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
  @Field(() => [User])
  notes: Note[]

  @Column()
  @Field()
  createdAt: Date

  @Column()
  @Field({ nullable: true })
  updatedAt?: Date
}
