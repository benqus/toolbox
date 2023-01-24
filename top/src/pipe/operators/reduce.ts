import { AnyArgs, Fn } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function reduce(fn: Fn): Operator {
  function _reduce({ next }: IPipeController, ...args: AnyArgs): void {
    const result = fn(...args);
    next(result);
  }

  return _reduce;
}
