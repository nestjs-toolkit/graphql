import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as IORedis from 'ioredis';
import { RedisOptions } from './types';

// REF: https://github.com/davidyaha/graphql-redis-subscriptions

export function instanceRedis(options?: RedisOptions): IORedis.Redis {
  const defaultOptions: IORedis.RedisOptions = {
    retryStrategy: times => {
      // reconnect after
      return Math.min(times * 50, 2000);
    },
  };

  if (typeof options === 'string') {
    return new IORedis(options, defaultOptions);
  } else {
    return new IORedis(Object.assign(defaultOptions, options));
  }
}

export function connectRedis(options?: RedisOptions): Promise<IORedis.Redis> {
  return new Promise<IORedis.Redis>(resolve => {
    const redis = instanceRedis(options);

    // the callback will be invoked once connected
    redis.on('connect', function() {
      resolve(redis);
    });
  });
}

export function connectRedisPubSub(options?: RedisOptions): RedisPubSub {
  const publisher = instanceRedis(options);
  const subscriber = instanceRedis(options);
  return new RedisPubSub({ publisher, subscriber });
}

export async function connectRedisPubSubAsync(
  options?: RedisOptions,
): Promise<RedisPubSub> {
  const publisher = await connectRedis(options);
  const subscriber = await connectRedis(options);
  return new RedisPubSub({ publisher, subscriber });
}
