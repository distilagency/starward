import { redisConfig, createRedisClient } from './';
import { environment } from '../utility';
import { REDIS_PREFIX } from '../config/app';

// create redis client
const redisClient = createRedisClient(REDIS_PREFIX);

module.exports = () => {
  return (req, res, next) => {
    // you must set the redis prefix if you want to use redis
    if (environment.isRedisEnabled && !REDIS_PREFIX) {
      throw new Error('REDIS_PREFIX needs to be configured in app.js for redis to work');
    }
    const queryRedis = req.path.indexOf('/api/') !== -1 && req.path.indexOf('flushredis') === -1 && req.method === 'GET';
    if (queryRedis) {
      let redisKey = req.url;
      // Check and strip trailing / from redisKey
      if (redisKey.length > 1 && /\/$/.test(redisKey)) {
        redisKey = redisKey.slice(req.path.length);
      }
      if (!redisKey || redisKey === '/') {
        redisKey = 'home';
      }
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
      });
    } else {
      next();
    }
  };
};
