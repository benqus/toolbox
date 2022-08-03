import { IChainable, ITargetable, NextProcessorFn } from '../types';

export function defaultExecutor<T>(): T {
  throw new Error('Node: executor not implemented!');
}

export class AsyncNode<Input = unknown, Output = unknown> implements IChainable<Input>, ITargetable<Output> {
  constructor(
    private readonly _execFn: NextProcessorFn<Input, Output> = defaultExecutor
  ) {}

  public target: IChainable<Output> | null = null;

  public async exec(input: Input): Promise<void> {
    const output: Output = await this._execFn(input);
    this.target?.exec(output);
  }
}
