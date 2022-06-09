import { join } from 'path';
import { GenerateOptions } from '@nestjs/graphql/dist/graphql-definitions.factory';

export const options: GenerateOptions = {
  typePaths: ['src/**/*.graphql', 'libs/**/*.graphql'],
  path: join(process.cwd(), 'src/definitions/graphql.schema.ts'),
  outputAs: 'interface',
  watch: true,
  emitTypenameField: false,
  skipResolverArgs: false,
};
