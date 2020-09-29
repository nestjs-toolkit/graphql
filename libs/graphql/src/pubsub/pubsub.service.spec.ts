import { Test, TestingModule } from '@nestjs/testing';
import { PubSubService } from './pubsub.service';
import { GqlPubSubModule } from './gql-pubsub.module';

describe('PubSubService', () => {
  let service: PubSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GqlPubSubModule.forRoot()],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
