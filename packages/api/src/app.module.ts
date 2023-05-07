import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'

import { AuthModule } from './modules/auth/auth.module'
import { NoteModule } from './modules/note/note.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      playground: process.env.NODE_ENV === 'development' ? true : false,
      introspection: process.env.NODE_ENV === 'development' ? true : false,
    }),
    NoteModule,
    AuthModule,
  ],
})
export class AppModule {}
