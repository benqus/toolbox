import { AnyArgs, Fn } from '../../common/types';
import { NextFn, Operator } from '../types';

export function filter(fn: Fn<AnyArgs, unknown>): Operator {
  function _filter(next: NextFn, ...args: AnyArgs) {
    const result = fn(...args);
    if (typeof result === 'undefined' || result === true) next(...args);
  }

  return _filter;
}
