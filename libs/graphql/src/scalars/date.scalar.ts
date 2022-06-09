import { Kind, ASTNode } from 'graphql';
import { Scalar } from '@nestjs/graphql';

@Scalar('Date')
export class DateScalar {
  description = 'Date JS';

  // value from the client
  parseValue(value: string) {
    return new Date(value);
  }

  // value sent to the client
  serialize(value: Date) {
    return value.getTime();
  }

  // ast value is always in string format
  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // ast value is always in string format
    }

    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    return null;
  }
}
