import { AnyArgs, Fn } from '../../common/types';
import { Operator, NextFn } from '../types';

export function fanout(...fns: Array<Fn>): Operator {
  function _fanout(next: NextFn, ...args: AnyArgs): void {
    fns.forEach((fn) => fn(...args));
    next(...args);
  }

  return _fanout;
}
