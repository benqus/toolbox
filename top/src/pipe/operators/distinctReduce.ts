import { AnyArgs, Fn } from '../../common/types';
import { Operator, NextFn } from '../types';

export function distinctReduce<T = unknown>(fn: Fn<AnyArgs, T>, lastOrInitialValue?: T): Operator {
  function _distinctReduce(next: NextFn, ...args: AnyArgs) {
    const newValue = fn(...args);
    if (newValue === lastOrInitialValue) return;
    lastOrInitialValue = newValue;
    next(...args);
  }

  return _distinctReduce;
}
