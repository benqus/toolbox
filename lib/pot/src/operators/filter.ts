import { AnyArgs, Fn, IExecutableFn } from '../types';

export function filter(fn: Fn<AnyArgs, unknown>): IExecutableFn {
  function _filter({ next }, ...args: AnyArgs) {
    const result = fn(...args);
    if (typeof result === 'undefined' || result === true) next(...args);
  }

  return _filter;
}
