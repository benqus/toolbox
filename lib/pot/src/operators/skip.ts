import { Args, IExecutableFn, IExecutionOptions } from '../types';

export function skip(count: number): IExecutableFn {
  let i = 0;

  function _skip(options: IExecutionOptions, ...args: Args): void {
    if (i < count) {
      i += 1;
      return;
    }
    options.next(...args);
  }

  return _skip;
}
