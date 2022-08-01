import { isPromise } from '@b/common/src/isPromise';

import { IExecutable, ITargetable, NextFN, NextProcessorFn } from './types';
import { buildNextFnForTargetable } from './buildNextFnForTargetable';

export { NextFN } from './types';

export function defaultExecutor<T>(): T {
  throw new Error('Node: executor not implemented!');
}

export class ExecNode<Input = unknown, Output = unknown> implements IExecutable<Input>, ITargetable<Output> {
  constructor(
    private readonly _executor: NextProcessorFn<Input, Output> = defaultExecutor
  ) {}

  private _callTargetExec = (output: Output): void => this.target?.exec(output as Output);

  public target: IExecutable<Output> | null = null;

  public exec(input: Input): void {
    const next: NextFN<Output> = buildNextFnForTargetable<Output>(this);
    try {
      const result = this._executor(input, next);
      if (next.hasBeenCalled()) return;
      next.invalidate();
      if (result) {
        if (isPromise<Output>(result)) {
          result.then(this._callTargetExec);
        } else {
          this._callTargetExec(result as Output);
        }
      }
      // TODO throw error of execution stopping
    } catch (e) {
      console.error('Error: Node#exec failed', e);
      throw e;
    }
  }
}
