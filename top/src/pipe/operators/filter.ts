import { AnyArgs, Fn } from '../../common/types';
import { IOperatorFn } from '../types';

export function filter(fn: Fn<AnyArgs, unknown>): IOperatorFn {
  function _filter({ next }, ...args: AnyArgs) {
    const result = fn(...args);
    if (typeof result === 'undefined' || result === true) next(...args);
  }

  return _filter;
}
