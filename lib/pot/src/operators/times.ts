import { Args, IExecutableFn, IExecutionOptions } from '../types';

export function times(count: number): IExecutableFn {
  function _times(options: IExecutionOptions, ...args: Args): void {
    for (let i = 0; i < count; i++) {
      options.next(...args);
    }
  }

  return _times;
}
