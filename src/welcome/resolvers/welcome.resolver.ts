import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { Logger } from '@nestjs/common';

@Resolver()
export class WelcomeResolver {
  private readonly logger = new Logger(WelcomeResolver.name);

  @Query()
  async hello() {
    return 'Hello World!';
  }

  @Query()
  async helloUpper() {
    return 'Hello World!';
  }

  @Query()
  testScalarDate(@Args('date') dt: Date): Date {
    this.logger.log('ISO DATE', dt.toISOString());
    return dt;
  }

  @Query()
  testCustomData(@Args('date') dt: Date): Date {
    return dt;
  }

  @Query()
  testCustomNUmber(): number {
    return 25.41567;
  }

  @Mutation()
  ping(@Args('message') msg: string): string {
    return msg;
  }

  // @Subscription()
  // pong() {}
}
