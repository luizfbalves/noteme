import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'

import { AuthModule } from './modules/auth/auth.module'
import { NoteModule } from './modules/note/note.module'

const dev = process.env.NODE_ENV === 'development'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      autoSchemaFile: dev ? join(process.cwd(), 'src/schema.gql') : true,
      playground: dev ? true : false,
      introspection: dev ? true : false,
    }),
    NoteModule,
    AuthModule,
  ],
})
export class AppModule {}
