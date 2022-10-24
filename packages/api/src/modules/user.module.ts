import { Module } from '@nestjs/common'
import { User } from 'src/schemas/users.schema'

@Module({
  imports: [User],
})
export class UserModule {}
