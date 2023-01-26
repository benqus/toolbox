import { AnyArgs, Fn } from '../../common/types';
import { Operator, NextFn } from '../types';

export function distinctReduce(fn: Fn): Operator {
  let lastValue: unknown;
  
  function _distinctReduce(next: NextFn, ...args: AnyArgs) {
    const newValue = fn(...args);
    if (newValue === lastValue) return;
    lastValue = newValue;
    next(...args);
  }

  return _distinctReduce;
}
