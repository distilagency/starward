import { createKeyGenerator, debugLogger } from '../utility';

const redisDebugLogger = debugLogger('ms', 'redix: ');

export default (client, keyPrefix) => {
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

  const __flushdb = (callback) => {
    if (client) {
      redisDebugLogger('flushdb start');
      client.flushdb((fail, success) => {
        const wasSuccess = success ? 'success' : 'a failure';
        redisDebugLogger(`flushdb was ${wasSuccess}`);
        callback(fail, success);
      });
    }
  };

  return {
    get: __get,
    setex: __setex,
    flushdb: __flushdb
  };
};
