import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import flash from 'express-flash';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';
import { ENV } from '../../env';
import { REDIS_PREFIX } from '../config/app';
import { redisConfig, createRedisClient } from '../redis';
import { environment } from '../utility';

// create redis client
const redisClient = createRedisClient(REDIS_PREFIX);

// you must set the redis prefix if you want to use redis
if (environment.isRedisEnabled && !REDIS_PREFIX) {
  throw new Error('REDIS_PREFIX needs to be configured in app.js for redis to work');
}

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (ENV === 'production') {
    app.use(gzip());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());

  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Strip forward slash
  app.use((req, res, next) => {
    if (req.path.length > 1 && /\/$/.test(req.path)) {
      const query = req.url.slice(req.path.length);
      res.redirect(301, req.path.slice(0, -1) + query);
    } else {
      next();
    }
  });

  // Redis API Middleware
  app.use((req, res, next) => {
    const queryRedis = req.path.indexOf('/api/') !== -1 && req.path.indexOf('flushredis') === -1 && req.method === 'GET';
    if (queryRedis) {
      const redisKey = req.url;
      redisClient.get(redisKey, (error, result) => {
        if (result) {
          res.send(JSON.parse(result));
        } else {
          res.sendResponse = res.send;
          res.send = (body) => {
            redisClient.setex(redisKey, redisConfig.redisLongExpiry, JSON.stringify(body));
            res.sendResponse(body);
          };
        }
        next();
      });
    } else {
      next();
    }
  });

  console.log('--------------------------');
  console.log('[1/4] 😊 Starting Server . . .');
  console.log(`[2/4] 🌵 Environment: ${ENV}`);
  console.log(`[3/4] 🐆 Redis: ${environment.isRedisEnabled ? 'Enabled 🏎🏎🏎' : 'Disabled'}`);
  console.log(`[4/4] 🚀 Listening on port: ${app.get('port')}`);
  console.log('--------------------------');

  app.use(flash());
};
