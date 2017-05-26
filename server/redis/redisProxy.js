import { createKeyGenerator, debugLogger } from '../utility';

const redisDebugLogger = debugLogger('ms', 'redix: ');

export default (client, keyPrefix) => {
  if (!client) {
    console.log();
    console.log('Redis is being bypassed as it is disabled');
    console.log();
  }

  const keyGenerator = createKeyGenerator(keyPrefix);

  const __get = (key, resultCallback) => {
    if (client) { // if redis enabled
      const fullKey = keyGenerator(key);
      redisDebugLogger(`get( ${fullKey} ) start`);
      client.get(fullKey, (err, result) => {
        // redisDebugLogger(`get( ${fullKey} ) err: {$err}, result: ${result}`);
        resultCallback(err, result);
      });
      redisDebugLogger(`get( ${fullKey} ) end`);
    } else {
      resultCallback(null, null);
    }
  };

  const __setex = (key, secondsToExpire, strData) => {
    if (client) {
      const fullKey = keyGenerator(key);
      redisDebugLogger(`setex( ${fullKey}, ${secondsToExpire}, ${strData} ) start`);
      client.setex(fullKey, secondsToExpire, strData);
      redisDebugLogger(`setex( ${fullKey}, ${secondsToExpire}, ... ) end`);
    }
  };

  return {
    get: __get,
    setex: __setex
  };
};