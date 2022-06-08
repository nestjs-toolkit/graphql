import { Module } from '@nestjs/common';
import { WelcomeResolver } from './resolvers';

@Module({
  providers: [WelcomeResolver],
})
export class WelcomeModule {}
