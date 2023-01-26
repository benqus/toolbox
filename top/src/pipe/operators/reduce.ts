import { AnyArgs, Fn } from '../../common/types';
import { Operator, NextFn } from '../types';

export function reduce(fn: Fn): Operator {
  function _reduce(next: NextFn, ...args: AnyArgs): void {
    const result = fn(...args);
    next(result);
  }

  return _reduce;
}
