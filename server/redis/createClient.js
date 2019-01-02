import redis from 'redis';
import redisProxy from './redisProxy';
import { isRedisEnabled } from '../utility/environment';
import { REDIS_HOST } from "../../env";

export default (keyPrefix) => {
  if (isRedisEnabled) {
    const client = redis.createClient({host: REDIS_HOST});

    client.on('error', (err) => {
      console.log('Error connecting to Redis', err);
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    return redisProxy(client, keyPrefix);
  }

  return redisProxy();
};
