
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'

import { NoteModule } from './modules/note/note.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      playground: process.env.NODE_ENV === 'dev' ? true : false,
      introspection: process.env.NODE_ENV === 'dev' ? true : false,
    }),
    NoteModule,
  ],
})
export class AppModule { }
