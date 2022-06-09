import { DocumentNode } from 'graphql';
import { AssertResponseGql } from '../responses/assert-response-gql';
import { AbstractClient } from './abstract.client';

export class GqlClient extends AbstractClient {
  protected config: any = {
    uri: '/graphql',
    user: null,
    headers: {
      Accept: 'application/json',
    },
  };

  public async request<Vars = any>(
    query: string | DocumentNode,
    variables?: Vars,
    headers?: any,
  ): Promise<AssertResponseGql> {
    const input = {
      query: typeof query === 'string' ? query : query.loc.source.body,
      variables,
    };

    this.config.headers = Object.assign({}, this.config.headers, headers);

    const response = await this.app.inject({
      method: 'POST',
      url: this.config.uri,
      headers: this.config.headers,
      payload: input,
    });

    this.reset();
    return new AssertResponseGql(response);
  }
}
