// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = Array<any>;
export type Maybe<T> = T | null;
export type Promisable<T = void> = Promise<T> | T;
export type Fn<FnArgs extends AnyArgs = AnyArgs, O = void> = (...args: FnArgs) => O;

export type FnTopicUnsubscribe = () => boolean;

export interface IEmitter<Args extends AnyArgs = AnyArgs> {
  listen(fn: Fn<Args>): FnTopicUnsubscribe;
  kill(): void;
}

export interface ILatest<T = unknown> {
  latest(): T;
}
