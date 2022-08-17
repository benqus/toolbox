// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Args = Array<any>;
export type Maybe<T = unknown> = T | null;
export type Promisable<T = void> = Promise<T> | T;
export type Fn<A extends Args = Args, O = void> = (...args: A) => O;

export interface IExecutionOptions {
  next(...args: Args): void;
  end(): void;
}

export interface IExecutableFn {
  (next: IExecutionOptions, ...args: Args): Promisable<void>;
}

export interface ILatest {
  latest(): unknown;
}

export interface ITopic<T = void> {
  subscribe(fn: Fn): T;
  unsubscribe(fn: Fn): T;
  clear(): T;
}

export interface ITopicFn extends ITopic<ITopicFn> {
  (...args: Args): void;
}

export interface IPipeFn extends ILatest {
  (...args: Args): void;
  topic: ITopicFn;
}

export interface IObservableFn<T> extends ILatest {
  (newValue: T): void;
  topic: ITopicFn;
}
