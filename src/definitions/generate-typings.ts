import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { options } from './configs';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate(options);
