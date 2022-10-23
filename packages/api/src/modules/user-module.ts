import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/dtos/entities/user-entity'
import { UsersResolver } from 'src/resolvers'
@Module({
  imports: [TypeOrmModule.forFeature([Users]), UsersResolver],
  exports: [TypeOrmModule],
  providers: [],
})
export class UsersModule {}
