import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function times(count: number): Operator {
  function _times(next: NextFn, ...args: AnyArgs): void {
    for (let i = 0; i < count; i++) {
      next(...args);
    }
  }

  return _times;
}
