import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import serverlessExpress from '@vendia/serverless-express'
import { APIGatewayProxyHandler, Callback, Context, Handler } from 'aws-lambda'
import express from 'express'

import { AppModule } from './app.module'

let server: Handler

const bootstrap = async (): Promise<Handler> => {
  const expressApp = express()

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))

  app.enableCors()
  await app.init()

  return serverlessExpress({ app: expressApp })
}

export const handler: APIGatewayProxyHandler = async (event: any, context: Context, callback: Callback) => {
  if (!server) {
    server = await bootstrap()
  }
  return server(event, context, callback)
}