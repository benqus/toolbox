import { AnyArgs, Fn } from '../../common';
import { IOperatorFn, IPipeController } from '../types';

export function distinct(fn: Fn): IOperatorFn {
  let lastValue: unknown;
  
  function _distinct({ next }: IPipeController, ...args: AnyArgs) {
    const newValue = fn(...args);
    if (newValue === lastValue) return;
    lastValue = newValue;
    next(...args);
  }

  return _distinct;
}
