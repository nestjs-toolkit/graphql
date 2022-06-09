import { get } from 'lodash';

export const nestedPropertyVal = (value: any, key: string, expected: any) => {
  expect(get(value, key)).toEqual(expected);
};

export const nestedProperty = (value: any, key: string) => {
  expect(get(value, key)).toBeDefined();
};

export const notNestedProperty = (value: any, key: string) => {
  expect(get(value, key)).toBeUndefined();
};
