import { AnyArgs, Fn } from '../../common/types';
import { Operator } from '../types';

export function filter(fn: Fn<AnyArgs, unknown>): Operator {
  function _filter({ next }, ...args: AnyArgs) {
    const result = fn(...args);
    if (typeof result === 'undefined' || result === true) next(...args);
  }

  return _filter;
}
