import { get } from 'lodash';
import { Response } from 'light-my-request';
import {
  nestedProperty,
  nestedPropertyVal,
  notNestedProperty,
} from './helpers';

type ValidationType = any;

export class AssertResponseGql {
  constructor(public response: Response) {}

  public get body() {
    return this.response.json();
  }

  public get bodyRaw() {
    return JSON.stringify(this.body, null, 2);
  }

  public get validation(): ValidationType[] {
    return this.body.errors[0]?.extensions?.validation || [];
  }

  public get firstResult() {
    if (!this.body.data) {
      throw new Error('Empty data');
    }

    const key = Object.keys(this.body.data)[0];

    if (!key) {
      console.error(`empty firstResult`, this.body);
    }

    return this.body.data[key];
  }

  public dump(): AssertResponseGql {
    console.log('===DUMP===', this.bodyRaw);
    return this;
  }

  public assertHasErrors(): AssertResponseGql {
    if (this.body.errors && this.body.errors.length) {
      return this;
    }

    this.dump();
    throw new Error(`Expected ERROR but not return`);
  }

  public assertNoErrors(): AssertResponseGql {
    if (this.body.errors && this.body.errors.length) {
      this.dump();
      console.error('Failed->assertNoErrors', this.body.errors);
      throw new Error(`Expected not ERROR but return`);
    }

    return this;
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

  public assertNoException(): AssertResponseGql {
    let extensions;
    if (
      this.body.errors &&
      this.body.errors[0] &&
      this.body.errors[0].extensions &&
      this.body.errors[0].extensions.exception
    ) {
      extensions = this.body.errors[0].extensions;
    }

    if (this.response.statusCode !== 200) {
      console.error('assertNoException', extensions);
      this.dump();
      throw new Error(
        `Expected HTTP 200 but return ${this.response.statusCode}`,
      );
    }

    return this;
  }

  public assertStatusHttp(status): AssertResponseGql {
    expect(this.response.statusCode).toBe(status);
    return this;
  }

  public assertCount(expectedQuantity: number, key: string): AssertResponseGql {
    const result = key ? get(this.firstResult, key) : this.firstResult;

    // `expect count ${expectedQuantity} from key: ${key}`
    expect(result).toHaveLength(expectedQuantity);
    return this;
  }

  public assertPropertyNull(key): AssertResponseGql {
    expect(get(this.firstResult, key)).toBeDefined();
    expect(get(this.firstResult, key)).toBeNull();
    return this;
  }

  public assertPropertyNotNull(key): AssertResponseGql {
    expect(get(this.firstResult, key)).toBeDefined();
    expect(get(this.firstResult, key)).not.toBeNull();
    return this;
  }

  public assertPropertyExists(key): AssertResponseGql {
    // `expected exists key: ${key}`,
    nestedProperty(this.firstResult, key);
    return this;
  }

  public assertPropertyNotExists(key): AssertResponseGql {
    //  `expected  NOT exists key: ${key}`,
    notNestedProperty(this.firstResult, key);
    return this;
  }

  public assertPropertyVal(expected, key): AssertResponseGql {
    expect(this.getData(key)).toEqual(expected);
    return this;
  }

  public assertPropertyRegexVal(expected: RegExp, key): AssertResponseGql {
    expect(expected.test(this.getData(key))).toBeTruthy();
    return this;
  }

  public assertPropertyContain(expected, key): AssertResponseGql {
    expect(this.getData(key)).toContain(expected);
    return this;
  }

  public assertPropertyStrictEqual(expected, key): AssertResponseGql {
    expect(this.getData(key)).toStrictEqual(expected);
    return this;
  }

  public getData(key?: string, defaultValue?: any) {
    if (!key) {
      return this.firstResult;
    }

    return get(this.firstResult, key, defaultValue);
  }

  public expectedFailedInputValidation(
    field: string,
    rule?: string,
    message?: string,
  ): AssertResponseGql {
    const fields = this.validation.filter((f) => f.field === field);

    if (!fields.length) {
      console.log({
        dump: `[expectedFailedInputValidation] NOT FOUND FIELD ERROR`,
        field,
        rule,
        validations: this.validation,
      });
    }

    expect(fields.length).toBeGreaterThan(0);

    if (!rule) {
      return this;
    }

    const result = fields.find((f) => f.validation === rule);

    if (!result) {
      console.log({
        dump: '[expectedFailedInputValidation] NOT FOUND RULES FOR FIELD',
        field,
        rule,
        validations: fields,
      });
    }

    // `Expect error on field: ${field} with rule: ${rule}`,
    expect(result).toBeDefined();

    if (message) {
      expect(result.message).toBe(message);
    }

    return this;
  }

  public expectedValidationError(): AssertResponseGql {
    return this.assertErrorCode('VALIDATION_FAILED');
  }

  public assertErrorCode(code: string): AssertResponseGql {
    this.assertHasErrors();
    nestedPropertyVal(this.body, 'errors.0.extensions.code', code);

    return this;
  }

  public assertErrorMessage(code: string): AssertResponseGql {
    this.assertHasErrors();
    nestedPropertyVal(this.body, 'errors.0.message', code);

    return this;
  }
}
