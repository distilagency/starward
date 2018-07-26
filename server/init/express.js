import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';
import { ENV } from '../../env';
import redisMiddleware from '../redis/redisMiddleware';
import { environment } from '../utility';

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (ENV === 'production') {
    app.use(gzip());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(redisMiddleware());

  app.use(express.static(path.join(__dirname, '..', 'public')));

  console.log('--------------------------');
  console.log('[1/4] 😊 Starting Server . . .');
  console.log(`[2/4] 🌵 Environment: ${ENV}`);
  console.log(`[3/4] 🐆 Redis: ${environment.isRedisEnabled ? 'Enabled 🏎🏎🏎' : 'Disabled'}`);
  console.log(`[4/4] 🚀 Listening on port: ${app.get('port')}`);
  console.log('--------------------------');
};
