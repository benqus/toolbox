import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function take(count: number): Operator {
  let i = 0;

  function _take(next: NextFn, ...args: AnyArgs): void {
    if (i < count) {
      next(...args);
      i += 1;
    }
  }

  return _take;
}
