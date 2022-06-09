import { AbstractAppTestSuite } from '@nestjs-toolkit/graphql/test-suite';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

export class AppTestSuite extends AbstractAppTestSuite {
  protected createTestingModule(): Promise<TestingModule> {
    return Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  }
}
