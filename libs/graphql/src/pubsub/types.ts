import { ModuleMetadata } from '@nestjs/common/interfaces';
import * as IORedis from 'ioredis';

export type RedisOptions = IORedis.RedisOptions | string;

export interface RedisModuleOptionsFactory
  extends Pick<ModuleMetadata, 'imports'>,
    IORedis.RedisOptions {
  useFactory: (...args: any[]) => RedisOptions | Promise<RedisOptions>;
  inject?: any[];
}
