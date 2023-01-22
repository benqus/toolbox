import { AnyArgs, Fn } from '../../common/types';
import { IOperatorFn, IPipeController } from '../types';

export function reduce(fn: Fn): IOperatorFn {
  function _reduce({ next }: IPipeController, ...args: AnyArgs): void {
    const result = fn(...args);
    next(result);
  }

  return _reduce;
}
