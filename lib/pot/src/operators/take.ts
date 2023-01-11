import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function take(count: number): IExecutableFn {
  let i = 0;

  function _take(options: IExecutionOptions, ...args: AnyArgs): void {
    if (i < count) {
      options.next(...args);
      i += 1;
    }
  }

  return _take;
}
