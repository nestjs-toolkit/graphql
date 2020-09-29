import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GQL_PUB_SUB, GQL_PUB_SUB_REDIS_OPTIONS } from './constants';
import { connectRedisPubSubAsync, connectRedisPubSub } from './redis.utils';
import { PubSubService } from './pubsub.service';
import { RedisModuleOptionsFactory, RedisOptions } from './types';

@Module({})
export class RedisPubSubModule {
  static forRoot(options?: RedisModuleOptionsFactory): DynamicModule {
    return this.createModule(false, options);
  }

  static forRootAsync(options?: RedisModuleOptionsFactory): DynamicModule {
    return this.createModule(true, options);
  }

  private static createModule(
    isAsync: boolean,
    options?: RedisModuleOptionsFactory,
  ): DynamicModule {
    const connectionProvider: Provider = {
      provide: GQL_PUB_SUB,
      useFactory: (options: RedisOptions) => {
        return isAsync
          ? connectRedisPubSubAsync(options)
          : connectRedisPubSub(options);
      },
      inject: [GQL_PUB_SUB_REDIS_OPTIONS],
    };

    return {
      module: RedisPubSubModule,
      imports: options?.imports,
      providers: [
        this.createOptionsProvider(options),
        connectionProvider,
        PubSubService,
      ],
      exports: [GQL_PUB_SUB, PubSubService],
      global: true,
    };
  }

  private static createOptionsProvider(
    options?: RedisModuleOptionsFactory,
  ): Provider {
    if (options && options.useFactory) {
      return {
        provide: GQL_PUB_SUB_REDIS_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: GQL_PUB_SUB_REDIS_OPTIONS,
      useValue: options,
    };
  }
}
