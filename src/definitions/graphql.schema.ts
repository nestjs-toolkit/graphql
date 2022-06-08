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
  format?: Nullable<string>;
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
  testObjectID(id: ObjectId, date: Date): string | Promise<string>;
  testCustomData(): CustomDate | Promise<CustomDate>;
  testCustomNUmber(): CustomNumber | Promise<CustomNumber>;
}

export interface IMutation {
  ping(message: string): boolean | Promise<boolean>;
}

export interface ISubscription {
  pont(): string | Promise<string>;
}

export type JSON = any;
export type ObjectId = any;
export type Upload = any;
type Nullable<T> = T | null;
