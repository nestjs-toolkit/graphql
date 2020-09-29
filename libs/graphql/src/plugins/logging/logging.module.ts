import { Module } from '@nestjs/common';
import { LoggingPlugin } from './logging.plugin';

@Module({
  providers: [LoggingPlugin],
})
export class LoggingGqlPluginModule {}
