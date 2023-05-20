import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.listen(3333)
}
config()
bootstrap()
