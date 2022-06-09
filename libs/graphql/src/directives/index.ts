import { upperDirectiveTransformer } from './upper.directive';

export const buildDirectives = (schema) => {
  return upperDirectiveTransformer(schema, 'upper');
};
