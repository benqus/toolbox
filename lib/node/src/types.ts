export interface NextFN<T> {
  (arg: T): void;
  hasBeenCalled(): boolean;
  invalidate(): void;
}

export type FilterFN<T> = (input: T) => boolean;
export type DistinctFN<T, U> = (input: T) => U;
export type MapFN<Input, Output> = (input: Input) => Output;
export type NextProcessorFn<Input, Output> = (input: Input, next: NextFN<Output>) => Promise<Output> | Output | null | void | unknown;

export interface IExecutable<Input> {
  exec(input: Input): void;
}

export interface ITargetable<Input> {
  target: IExecutable<Input> | null;
}

export interface IMultiTargetable<Input> {
  readonly targets: Set<IExecutable<Input>>;
  addTarget(executable: IExecutable<Input>): void;
  removeTarget(executable: IExecutable<Input>): void;
}
