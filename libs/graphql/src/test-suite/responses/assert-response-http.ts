import { AssertResponseGql } from './assert-response-gql';

type ValidationType = any;

export class AssertResponseHttp extends AssertResponseGql {
  public get validation(): ValidationType[] {
    throw new Error('Not implemented');
    // return this.body.errors[0]?.extensions?.validation || [];
  }

  public get firstResult() {
    if (!this.body) {
      throw new Error('Empty data');
    }

    return this.body;
  }

  public assertHasErrors(): AssertResponseGql {
    if (!this.statusOK()) {
      return this;
    }

    this.dump();
    throw new Error(`Expected ERROR but not return`);
  }

  public assertNoErrors(): AssertResponseGql {
    if (this.statusOK()) {
      return this;
    }

    this.dump();
    console.error('Failed->assertNoErrors', this.body.errors);
    throw new Error(`Expected not ERROR but return`);
  }

  public assertResultIsNull(): AssertResponseGql {
    const result = this.firstResult;
    expect(result).toBeNull();
    return this;
  }

  public assertException(): AssertResponseGql {
    this.assertStatusHttp(400);
    return this;
  }

  public statusOK(): boolean {
    return this.response.statusCode === 200 || this.response.statusCode === 201;
  }

  public assertNoException(): AssertResponseGql {
    if (this.statusOK()) {
      return this;
    }

    this.dump();
    throw new Error(`Expected HTTP 200 but return ${this.response.statusCode}`);
  }

  public expectedFailedInputValidation(
    field: string,
    rule?: string,
    message?: string,
  ): AssertResponseGql {
    throw new Error('Not implemented');
  }

  public expectedValidationError(): AssertResponseGql {
    throw new Error('Not implemented');
  }

  public assertErrorCode(code: string): AssertResponseGql {
    throw new Error('Not implemented');
  }
}
