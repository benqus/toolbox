import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function skip(count: number): IExecutableFn {
  let i = 0;

  function _skip(options: IExecutionOptions, ...args: AnyArgs): void {
    if (i < count) {
      i += 1;
      return;
    }
    options.next(...args);
  }

  return _skip;
}
