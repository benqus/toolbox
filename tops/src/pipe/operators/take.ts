import { AnyArgs } from '../../common';
import { IOperatorFn, IPipeController } from '../types';

export function take(count: number): IOperatorFn {
  let i = 0;

  function _take(options: IPipeController, ...args: AnyArgs): void {
    if (i < count) {
      options.next(...args);
      i += 1;
    }
  }

  return _take;
}
