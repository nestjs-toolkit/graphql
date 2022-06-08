import { PubSub } from 'graphql-subscriptions';
import { DynamicModule, Module } from '@nestjs/common';
import { GQL_PUB_SUB } from '../constants';
import { PubSubService } from '../pubsub.service';

@Module({})
export class MemoryPubSubModule {
  static forRoot(): DynamicModule {
    return {
      module: MemoryPubSubModule,
      providers: [
        PubSubService,
        {
          provide: GQL_PUB_SUB,
          useValue: new PubSub(),
        },
      ],
      exports: [PubSubService, GQL_PUB_SUB],
      global: true,
    };
  }
}
