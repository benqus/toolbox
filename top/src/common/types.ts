// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = Array<any>;
export type Maybe<T> = T | null;
export type Promisable<T = any> = Promise<T> | T;
export type Fn<FnArgs extends AnyArgs = AnyArgs, O = void> = (...args: FnArgs) => O;

export interface IUnsubscribe {
  (): boolean;
}

export interface ISubscribable<Args extends AnyArgs = AnyArgs> {
  subscribe(fn: Fn<Args>): IUnsubscribe;
}

export interface ILatest<T = unknown> {
  latest(): T;
}
