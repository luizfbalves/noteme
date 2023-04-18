import { NestFactory } from '@nestjs/core'
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module'

let server: Handler

async function bootstrap(): Promise<Handler> {

  const app = await NestFactory.create(AppModule, { cors: true })
  app.init()

  const App = app.getHttpAdapter().getInstance()

  return serverlessExpress({ app: App })
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
}
