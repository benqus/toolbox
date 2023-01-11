import { AnyArgs, Fn, IExecutableFn, IExecutionOptions } from '../types';

export function distinct(fn: Fn): IExecutableFn {
  let lastValue: unknown;
  
  function _distinct({ next }: IExecutionOptions, ...args: AnyArgs) {
    const newValue = fn(...args);
    if (newValue === lastValue) return;
    lastValue = newValue;
    next(...args);
  }

  return _distinct;
}
