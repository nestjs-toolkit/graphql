import { NestFastifyApplication } from '@nestjs/platform-fastify';

export abstract class AbstractClient {
  protected readonly initialConfig: any;

  protected config: any = {
    uri: '/',
    user: null,
    headers: {
      Accept: 'application/json',
    },
  };

  constructor(protected readonly app: NestFastifyApplication) {
    this.initialConfig = {
      ...this.config,
      headers: {
        ...this.config?.headers,
      },
    };
  }

  public authorization(token: string): this {
    this.header('Authorization', `Bearer ${token}`);
    return this;
  }

  public header(key: string, value: any): this {
    this.config.headers[key] = value;
    return this;
  }

  public setHeaders(headers: any): this {
    this.config.headers = { ...headers };
    return this;
  }

  public reset(): void {
    this.config = {
      ...this.initialConfig,
      headers: {
        ...this.initialConfig?.headers,
      },
    };
  }
}
