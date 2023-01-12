// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArgs = Array<any>;
export type Promisable<T = void> = Promise<T> | T;
export type Fn<FnArgs extends AnyArgs = AnyArgs, O = void> = (...args: FnArgs) => O;

export interface ILatest<T = unknown> {
  latest(): T;
}
