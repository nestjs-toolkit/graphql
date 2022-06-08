import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ObjectId } from 'bson';

@Resolver()
export class WelcomeResolver {
  @Query()
  async hello() {
    return 'Hello World!';
  }

  @Query()
  async helloUpper() {
    return 'Hello World!';
  }

  @Query()
  testObjectID(@Args('id') id: ObjectId, @Args('date') dt: Date): string {
    console.log('DATE', dt.toISOString());
    return id.toString();
  }

  @Query()
  testCustomData(): Date {
    return new Date();
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
