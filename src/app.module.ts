import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { buildDirectives, ToolkitGraphqlModule } from '@nestjs-toolkit/graphql';
import { normalizeHeaders } from '@nestjs-toolkit/base/utils';
import { GqlLocaleInterceptor } from '@nestjs-toolkit/base/locale/gql-locale.interceptor';
import { options } from './definitions/configs';
import { WelcomeModule } from './welcome';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        debug: true,
        tracing: true,
        playground: true,
        introspection: true,
        cors: {
          origin: '*',
          credentials: true,
        },
        path: '/graphql',
        typePaths: options.typePaths,
        installSubscriptionHandlers: true,
        transformSchema: (schema) => buildDirectives(schema),
        subscriptions: {
          'subscriptions-transport-ws': {
            keepAlive: 5000,
            onConnect: async (connectionParams: Record<string, any>) => {
              return {
                connectionParams: normalizeHeaders(connectionParams),
              };
            },
          },
        },
      }),
    }),
    ToolkitGraphqlModule,
    WelcomeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlLocaleInterceptor,
    },
  ],
})
export class AppModule {}
