import { ResolveField, Resolver } from '@nestjs/graphql';
import { currencyFormat } from '@nestjs-toolkit/base/utils';

@Resolver('CustomNumber')
export class CustomNumberResolver {
  @ResolveField()
  string(number: number): string {
    return number.toString();
  }

  @ResolveField()
  int(number: number): number {
    return parseInt(number.toString(), 0) || 0;
  }

  @ResolveField()
  float(number: number): number {
    return parseFloat(number.toString()) || 0;
  }

  @ResolveField()
  fixed(number: number, { digits }): string {
    return parseFloat(number.toString()).toFixed(digits);
  }

  @ResolveField()
  format(number: number, { digits, after, before }): string {
    return `${after || ''}${currencyFormat(number, digits)}${before || ''}`;
  }
}
