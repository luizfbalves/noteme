import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the note' })
  id: string

  @Column()
  @Field({ nullable: true })
  description?: string

  @Column()
  @Field()
  createdAt: Date

  @Column()
  @Field({ nullable: true })
  updatedAt?: Date

  @Column()
  @Field()
  userId: string
}
