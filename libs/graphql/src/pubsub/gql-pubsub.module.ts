import { DynamicModule, Module } from '@nestjs/common';
import { GQL_PUB_SUB } from './constants';
import { PubSubService } from './pubsub.service';
import { PubSub } from 'graphql-subscriptions';

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
