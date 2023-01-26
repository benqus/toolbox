import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function skip(count: number): Operator {
  let i = 0;

  function _skip(next: NextFn, ...args: AnyArgs): void {
    if (i < count) {
      i += 1;
      return;
    }
    next(...args);
  }

  return _skip;
}
