import { Args, Fn, IExecutableFn, IExecutionOptions } from '../types';

export function reduce(fn: Fn): IExecutableFn {
  function _reduce({ next }: IExecutionOptions, ...args: Args): void {
    const result = fn(...args);
    next(result);
  }

  return _reduce;
}
