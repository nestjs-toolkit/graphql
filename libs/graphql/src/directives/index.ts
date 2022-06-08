import { upperDirectiveTransformer } from './upper.directive';

export const coreBuildDirectives = (schema) => {
  return upperDirectiveTransformer(schema, 'upper');
};
