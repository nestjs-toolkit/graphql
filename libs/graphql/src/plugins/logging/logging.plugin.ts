import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import {
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextWillSendResponse,
  ValueOrPromise,
} from 'apollo-server-types';
import { WinstonLogger } from '@nestjs-toolkit/winston-logger';

export type ContextType = {
  request?: any;
  user?: any;
};

function makeTime({ start }) {
  const end = new Date().getTime();

  return {
    start,
    end,
    diff: end - start,
  };
}

function willSendResponse(
  data: any,
  logger: WinstonLogger,
  requestContext: GraphQLRequestContextWillSendResponse<ContextType>,
): ValueOrPromise<void> {
  if (!requestContext.errors) {
    data.timer = makeTime(data.timer);
    logger.logGraphqlRequest(
      requestContext,
      requestContext.context.user,
      'GraphQl_LoggingPlugin',
      data,
    );
  }
}

function didEncounterErrors(
  data: any,
  logger: WinstonLogger,
  requestContext: GraphQLRequestContextDidEncounterErrors<ContextType>,
): void {
  data.timer = makeTime(data.timer);
  logger.logGraphqlError(
    requestContext,
    requestContext.context.user,
    'GraphQl_LoggingPlugin',
    data,
  );
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin<ContextType> {
  constructor(private readonly logger: WinstonLogger) {}

  /**
   * requestDidStart
   * Triggered at the beginning of every request cycle, and returns an object (GraphQLRequestListener)
   * that has the functions for each request lifecycle event.
   *
   * @params context: GraphQLRequestContext<ContextType>,
   */
  public requestDidStart(): GraphQLRequestListener {
    // console.log('ApolloIdempotent::requestDidStart', context);
    // Assume the common 'source' and 'metrics' fields are available here for all
    // console.log('ApolloIdempotent::requestDidStart source', context.source);
    // console.log('ApolloIdempotent::requestDidStart metrics', context.metrics);

    const data = {
      timer: {
        start: new Date().getTime(),
      },
    };

    return {
      willSendResponse: willSendResponse.bind(null, data, this.logger),
      didEncounterErrors: didEncounterErrors.bind(null, data, this.logger),
    };
  }

  /**
   * The parsingDidStart event fires whenever Apollo Server will parse a GraphQL request to create its associated document AST.
   * If Apollo Server receives a request with a query string that matches a previous request, the associated document might already be
   * available in Apollo Server's cache. In this case, parsingDidStart is not called for the request, because parsing does not occur.
   * @param context 'metrics' | 'source'
   */
  // public parsingDidStart(context: GraphQLRequestContext): void {
  //   console.log('ApolloIdempotent::parsingDidStart', context);
  // }

  /**
   * The validationDidStart event fires whenever Apollo Server will validate a request's document AST against your GraphQL schema.
   * Like parsingDidStart, this event does not fire if a request's document is already available in Apollo Server's cache
   * (only successfully validated documents are cached by Apollo Server).
   * The document AST is guaranteed to be available at this stage, because parsing must succeed for validation to occur.
   * @param context 'metrics' | 'source' | 'document'
   */
  // public validationDidStart(context: GraphQLRequestContext): void {
  //   console.log('ApolloIdempotent::validationDidStart', context);
  // }

  /**
   * The didResolveOperation event fires after the graphql library successfully determines the operation to execute from a request's document AST.
   * At this stage, both the operationName string and operation AST are available.
   * @param context 'metrics' | 'source' | 'document' | 'operationName' | 'operation'
   */
  // public didResolveOperation(context: GraphQLRequestContext) {
  //   console.log('ApolloIdempotent::didResolveOperation', context);
  //   console.log('ApolloIdempotent::didResolveOperation document', context.document);
  //   console.log('ApolloIdempotent::didResolveOperation operationName', context.operationName);
  //   console.log('ApolloIdempotent::didResolveOperation operation', context.operation);
  // }

  /**
   * The responseForOperation event is fired immediately before GraphQL execution would take place.
   * If its return value resolves to a non-null GraphQLResponse, that result is used instead of executing the query.
   * Hooks from different plugins are invoked in series and the first non-null response is used.
   * @param context 'metrics' | 'source' | 'document' | 'operationName' | 'operation'
   */
  // public responseForOperation(context: GraphQLRequestContext): GraphQLResponse | null {
  //   console.log('ApolloIdempotent::responseForOperation', context);
  //   console.log('ApolloIdempotent::responseForOperation document', context.document);
  //   console.log('ApolloIdempotent::responseForOperation operationName', context.operationName);
  //   console.log('ApolloIdempotent::responseForOperation operation', context.operation);
  //   return null;
  // }

  /**
   * The executionDidStart event fires whenever Apollo Server begins executing the GraphQL operation specified by a request's document AST.
   * @param context 'metrics' | 'source' | 'document' | 'operationName' | 'operation'
   */
  // public executionDidStart(context: GraphQLRequestContext): void {
  //   console.log('ApolloIdempotent::executionDidStart', context);
  //   console.log('ApolloIdempotent::executionDidStart document', context.document);
  //   console.log('ApolloIdempotent::executionDidStart operationName', context.operationName);
  //   console.log('ApolloIdempotent::executionDidStart operation', context.operation);
  // }

  /**
   * The didEncounterErrors event fires when Apollo Server encounters errors while parsing, validating, or executing a GraphQL operation.
   * @param context 'metrics' | 'source' | 'errors'
   */
  // public didEncounterErrors(context: GraphQLRequestContext): void {
  //   console.log('ApolloIdempotent::didEncounterErrors', context);
  //   console.log('ApolloIdempotent::didEncounterErrors errors:', context.errors);
  // }

  /**
   * The willSendResponse event fires whenever Apollo Server is about to send a response for a GraphQL operation.
   * This event fires (and Apollo Server sends a response) even if the GraphQL operation encounters one or more errors.
   * @param context 'metrics' | 'response'
   */
  // public willSendResponse(context: GraphQLRequestContext): void {
  //   console.log('ApolloIdempotent::willSendResponse', context);
  //   console.log('ApolloIdempotent::willSendResponse response:', context.response);
  // }
}
