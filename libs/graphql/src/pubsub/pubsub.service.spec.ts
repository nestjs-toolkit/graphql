import { Test, TestingModule } from '@nestjs/testing';
import { MemoryPubSubModule } from './memory';
import { RedisPubSubModule } from './redis';
import { PubSubService } from './pubsub.service';

describe('PubSubService', () => {
  let module: TestingModule;
  let service: PubSubService;

  describe('MemoryPubSubModule', () => {
    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [MemoryPubSubModule.forRoot()],
      }).compile();

      service = module.get<PubSubService>(PubSubService);
    });

    afterAll(async () => {
      await module.close();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('RedisPubSubModule', () => {
    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [RedisPubSubModule.forRoot()],
      }).compile();

      service = module.get<PubSubService>(PubSubService);
    });

    afterAll(async () => {
      await module.close();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
