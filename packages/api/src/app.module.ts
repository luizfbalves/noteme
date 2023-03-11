import { NoteModule } from '@modules/note/note.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import { join } from 'node:path'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      persistedQueries: false,
      introspection: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      playground: false,
      path: '/graphql',
      plugins: [ApolloServerPluginLandingPageDisabled()],
    }),
    NoteModule,
  ],
})
export class AppModule { }
