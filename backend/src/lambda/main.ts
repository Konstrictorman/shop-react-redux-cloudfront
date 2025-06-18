import { Handler, Context, Callback } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { AppModule } from '../app.module'; // adjust if path differs
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer;

/**
 * Bootstraps the NestJS app and wraps it using aws-serverless-express.
 */
async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    nestApp.enableCors();
    await nestApp.init();
    cachedServer = createServer(expressApp);
  }
  return cachedServer;
}

/**
 * Lambda handler: wraps the NestJS app in a Lambda-compatible format.
 */
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
