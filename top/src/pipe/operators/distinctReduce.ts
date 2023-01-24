import { AnyArgs, Fn } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function distinctReduce(fn: Fn): Operator {
  let lastValue: unknown;
  
  function _distinctReduce({ next }: IPipeController, ...args: AnyArgs) {
    const newValue = fn(...args);
    if (newValue === lastValue) return;
    lastValue = newValue;
    next(...args);
  }

  return _distinctReduce;
}
