import { GqlClient, HttpClient } from '@nestjs-toolkit/graphql/test-suite';
import { AppTestSuite } from '../app-test-suite';

export abstract class AbstractPersona {
  public suite: AppTestSuite;

  get gql(): GqlClient {
    return this.suite.makeGql();
  }

  get http(): HttpClient {
    return this.suite.makeHttp();
  }

  public async init() {
    this.suite = new AppTestSuite();
    await this.suite.init();
  }

  public async close() {
    await this.suite.close();
  }

  public extendApp(person: AbstractPersona): AbstractPersona {
    person.suite = this.suite;
    return person;
  }
}
