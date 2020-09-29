import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GQL_PUB_SUB } from './constants';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class PubSubService implements OnApplicationShutdown {
  constructor(@Inject(GQL_PUB_SUB) private readonly pubSub: PubSub) {}

  async onApplicationShutdown(): Promise<void> {
    if (this.pubSub instanceof RedisPubSub) {
      await this.pubSub.close();
    }
  }

  publish(triggerName: string, payload: any): Promise<void> {
    return this.pubSub.publish(triggerName, { [triggerName]: payload });
  }

  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    return this.pubSub.asyncIterator(triggers);
  }
}
