import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GQL_PUB_SUB } from './constants';

type PubSubCustom = PubSub & { close?: any };

@Injectable()
export class PubSubService implements OnApplicationShutdown {
  constructor(@Inject(GQL_PUB_SUB) public readonly pubSub: PubSubCustom) {}

  async onApplicationShutdown(): Promise<void> {
    if (this.pubSub.close) {
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
