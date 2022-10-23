import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Notes } from 'src/dtos/entities/notes-entity'
import { NotesResolver } from 'src/resolvers'

@Module({
  imports: [TypeOrmModule.forFeature([Notes]), NotesResolver],
  exports: [TypeOrmModule],
})
export class NotesModule {}
