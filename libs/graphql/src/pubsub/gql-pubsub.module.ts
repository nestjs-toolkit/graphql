import { DynamicModule, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PubSubService } from './pubsub.service';
import { GQL_PUB_SUB } from './constants';

@Module({})
export class GqlPubSubModule {
  static forRoot(): DynamicModule {
    return {
      module: GqlPubSubModule,
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
