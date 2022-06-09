import { Module } from '@nestjs/common';
import { WelcomeResolver } from './resolvers';
import { WelcomeController } from './controllers';

@Module({
  providers: [WelcomeResolver],
  controllers: [WelcomeController],
})
export class WelcomeModule {}
