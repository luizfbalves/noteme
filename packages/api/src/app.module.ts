import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'node:path'

import { NotesResolver, UsersResolver } from './resolvers'

@Module({
  imports: [
    NotesResolver,
    UsersResolver,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pgadmin',
      password: 'pgadmin',
      database: 'notemedb',
      autoLoadEntities: true,
      synchronize: true, // dont use in production
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
