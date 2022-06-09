import { Module } from '@nestjs/common';
import { DateScalar } from './scalars';
import { CustomDateResolver, CustomNumberResolver } from './resolvers';

@Module({
  providers: [DateScalar, CustomDateResolver, CustomNumberResolver],
})
export class ToolkitGraphqlModule {}
