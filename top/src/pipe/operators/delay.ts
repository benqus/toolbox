import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function delay(ms: number): Operator {
  function _delay(next: NextFn, ...args: AnyArgs): void {
    setTimeout(() => next(...args), ms);
  }

  return _delay;
}
