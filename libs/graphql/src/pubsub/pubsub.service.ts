import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
import { GQL_PUB_SUB } from './constants';

@Injectable()
export class PubSubService implements OnApplicationShutdown {
  constructor(@Inject(GQL_PUB_SUB) public readonly pubSub: PubSub) {}

  async onApplicationShutdown(): Promise<void> {
    if (this.pubSub instanceof RedisPubSub) {
      await this.pubSub.close();
    }
  }

  publish(triggerName: string, payload: any): Promise<void> {
    return this.pubSub.publish(triggerName, { [triggerName]: payload });
  }

  customPublish(
    triggerName: string,
    payload: Record<string, any>,
  ): Promise<void> {
    return this.pubSub.publish(triggerName, payload);
  }

  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    return this.pubSub.asyncIterator(triggers);
  }
}
