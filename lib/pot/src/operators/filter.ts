import { Args, Fn, IExecutableFn } from '../types';

export function filter(fn: Fn<Args, unknown>): IExecutableFn {
  function _filter({ next }, ...args: Args) {
    const result = fn(...args);
    if (typeof result === 'undefined' || result === true) next(...args);
  }

  return _filter;
}
