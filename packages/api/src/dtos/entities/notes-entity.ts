import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Notes {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @Column()
  userId: string

  @Column()
  createdAt: Date

  @Column({ nullable: true })
  updatedAt?: Date
}
