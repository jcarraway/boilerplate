import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';

import { createDbConn } from './createDbConn';
import { buildTypeGraphQLSchema } from './buildSchema';
import { redis } from './redis';
import { redisSessionPrefix } from './constants';

const RedisStore = connectRedis(session);

const startServer = async () => {
  if (process.env.NODE_ENV === 'test') {
    await redis.flushall();
  }
  await createDbConn();

  const app = express();

  const server = new ApolloServer({
    schema: await buildTypeGraphQLSchema(),
    context: ({ req, res }: any) => ({ redis, req, res }),
    tracing: true,
    // cacheControl: true,
  });

  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === 'test'
          ? '*'
          : (process.env.FRONTEND_HOST as string),
    })
  );

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const xid = authorization.split(' ')[1];
        req.headers.cookie = `xid=${xid}`;
      } catch (_) {}
    }

    return next();
  });

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix,
      }),
      name: 'xid',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  const port = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 4000;

  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
