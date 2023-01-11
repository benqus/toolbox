// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = Array<any>;
export type Maybe<T = unknown> = T | null;
export type Promisable<T = void> = Promise<T> | T;
export type Fn<A extends AnyArgs = AnyArgs, O = void> = (...args: A) => O;
export type UnsubscribeFn = () => void;

export interface IExecutionOptions {
  next(...args: AnyArgs): void;
  end(): void;
}

export interface IExecutableFn {
  (next: IExecutionOptions, ...args: AnyArgs): Promisable<void>;
}

export interface ILatest {
  latest(): unknown;
}

export interface ITopic<T = void> {
  subscribe(fn: Fn): UnsubscribeFn;
  unsubscribe(fn: Fn): T;
  clear(): T;
}

export interface ITopicFn<Args extends AnyArgs = AnyArgs> extends ITopic<ITopicFn<Args>> {
  (...args: Args): void;
}

export interface IPipeFn extends ILatest, ITopic<ITopicFn<AnyArgs>> {
  (...args: AnyArgs): void;
}

export interface IObservableFn<T> extends ILatest, ITopic<ITopicFn<[T, T]>> {
  (newValue: T): void;
}
