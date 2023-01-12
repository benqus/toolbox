import { AnyArgs, Fn } from '../../common';
import { IExecutableFn, IPipeController } from '../types';

export function reduce(fn: Fn): IExecutableFn {
  function _reduce({ next }: IPipeController, ...args: AnyArgs): void {
    const result = fn(...args);
    next(result);
  }

  return _reduce;
}
