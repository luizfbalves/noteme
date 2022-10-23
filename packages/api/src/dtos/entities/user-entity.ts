import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt?: Date
}
