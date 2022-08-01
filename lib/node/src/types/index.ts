export interface NextFN<T> {
  (arg: T): void;
  hasBeenCalled(): boolean;
  invalidate(): void;
}

export type FilterFN<T> = (input: T) => boolean;
export type DistinctFN<T, U> = (input: T) => U;
export type MapFN<Input, Output> = (input: Input) => Output;
export type NextProcessorFn<Input, Output> =
  (input: Input, next: NextFN<Output>) => Promise<Output> | Output | null | void | unknown;

export interface IChainable<Input> {
  exec(input: Input): void;
}

export interface ITargetable<Input> {
  target: IChainable<Input> | null;
}

export type IExecutable<T = unknown> = ITargetable<T> & IChainable<T>;

export interface IMultiTargetable<Input> {
  readonly targets: Set<IChainable<Input>>;
  addTarget(executable: IChainable<Input>): void;
  removeTarget(executable: IChainable<Input>): void;
}
