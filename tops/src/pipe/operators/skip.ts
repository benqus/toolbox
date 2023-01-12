import { AnyArgs } from '../../common';
import { IOperatorFn, IPipeController } from '../types';

export function skip(count: number): IOperatorFn {
  let i = 0;

  function _skip(options: IPipeController, ...args: AnyArgs): void {
    if (i < count) {
      i += 1;
      return;
    }
    options.next(...args);
  }

  return _skip;
}
