export interface NextFN<T> {
  (arg: T): void;
  hasBeenCalled(): boolean;
  invalidate(): void;
}

export type FilterFN<T> = (input: T) => boolean;
export type DistinctFN<T, U> = (input: T) => U;
export type MapFN<Input, Output> = (input: Input) => Output;
export type NextProcessorFn<Input, Output> = (input: Input) => Promise<Output> | Output;

export interface IChainable<Input> {
  exec(input: Input): void;
}

export interface ITargetable<Input> {
  target: IChainable<Input> | null;
}

export type IExecutable<T = unknown> = ITargetable<T> & IChainable<T>;

export interface IMultiTargetable<T> extends IChainable<T> {
  readonly targets: Set<IChainable<T>>;
  addTarget(executable: IChainable<T>): void;
  removeTarget(executable: IChainable<T>): void;
}

export interface IRouteable<T> extends IChainable<T> {
  readonly targets: Map<keyof T, [ T[keyof T], IChainable<T> ]>;
  route(routeProp: keyof T, matchValue: T[keyof T], executable: IChainable<T>): void;
  unroute(routeProp: keyof T): void;
}
