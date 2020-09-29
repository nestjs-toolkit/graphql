import { Module } from '@nestjs/common';
import { ObjectIdScalar } from './scalars';
import { CustomDateResolver, CustomNumberResolver } from './resolvers';

@Module({
  providers: [ObjectIdScalar, CustomDateResolver, CustomNumberResolver],
})
export class CommonGraphqlModule {}
