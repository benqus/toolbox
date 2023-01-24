// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = Array<any>;

export type Nullable<T> = T | null;

export type Promisable<T = any> = Promise<T> | T;

export type Fn<FnArgs extends AnyArgs = AnyArgs, O = void> = (...args: FnArgs) => O;

export type Unsubscriber = () => boolean;

export interface ISubscribable<Args extends AnyArgs = AnyArgs> {
  subscribe(fn: Fn<Args>): Unsubscriber;
}

export interface ILatest<T = unknown> {
  latest(): T;
}
