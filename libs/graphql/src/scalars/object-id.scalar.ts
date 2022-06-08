import { ObjectId } from 'bson';
import { Kind, ASTNode } from 'graphql';
import { Scalar } from '@nestjs/graphql';

@Scalar('ObjectId')
export class ObjectIdScalar {
  description = 'MongoDB ObjectId scalar type, sent as 24 byte Hex String';

  parseValue(value: string) {
    return new ObjectId(value); // value from the client
  }

  serialize(value: ObjectId) {
    return value.toHexString(); // value sent to the client
  }

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // ast value is always in string format
    }

    return null;
  }
}
