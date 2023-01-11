import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function times(count: number): IExecutableFn {
  function _times(options: IExecutionOptions, ...args: AnyArgs): void {
    for (let i = 0; i < count; i++) {
      options.next(...args);
    }
  }

  return _times;
}
