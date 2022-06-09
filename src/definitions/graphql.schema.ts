/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CustomDate {
  timestamp?: Nullable<number>;
  unix?: Nullable<number>;
  utc?: Nullable<string>;
  iso?: Nullable<string>;
  string?: Nullable<string>;
  timezone?: Nullable<string>;
  transform?: Nullable<string>;
}

export interface CustomNumber {
  string?: Nullable<string>;
  int?: Nullable<number>;
  float?: Nullable<number>;
  fixed?: Nullable<string>;
  format?: Nullable<string>;
}

export interface IQuery {
  hello(): string | Promise<string>;
  helloUpper(): string | Promise<string>;
  testScalarDate(date: Date): Date | Promise<Date>;
  testCustomData(date: Date): CustomDate | Promise<CustomDate>;
  testCustomNUmber(): CustomNumber | Promise<CustomNumber>;
}

export interface IMutation {
  ping(message: string): boolean | Promise<boolean>;
}

export interface ISubscription {
  pont(): string | Promise<string>;
}

type Nullable<T> = T | null;
