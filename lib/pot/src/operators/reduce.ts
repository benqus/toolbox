import { AnyArgs, Fn, IExecutableFn, IExecutionOptions } from '../types';

export function reduce(fn: Fn): IExecutableFn {
  function _reduce({ next }: IExecutionOptions, ...args: AnyArgs): void {
    const result = fn(...args);
    next(result);
  }

  return _reduce;
}
