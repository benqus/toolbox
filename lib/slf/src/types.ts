/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type Promisable<T> = T | Promise<T>;
export type FnArgs = Array<any>;

export type TListener = IFn<FnArgs, Promisable<unknown>>;

export type TLatest<T = unknown> = {
  $latest(): T;
  $empty(): void;
}

export type TTopic<T> = {
  $subscribe(...args: Array<IFn<FnArgs, Promisable<unknown>>>): T;
  $unsubscribe(...args: Array<IFn<FnArgs, Promisable<unknown>>>): T;
}

// function interfaces

export interface IFn<Args extends FnArgs = FnArgs, Output = unknown> {
  (...args: Args): Promisable<Output>;
}

export interface IFnPipe extends TTopic<IFnTopic>, TLatest {
  (...args: FnArgs): Promisable<unknown>;
}

export interface IFnTopic extends TTopic<IFnTopic> {
  (...args: FnArgs): void;
}

export interface IFnObservable<T> extends TTopic<IFnTopic>, TLatest {
  (newValue: T): void;
}
