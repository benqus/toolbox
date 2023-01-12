import { AnyArgs } from '../../common';
import { IExecutableFn, IPipeController } from '../types';

export function take(count: number): IExecutableFn {
  let i = 0;

  function _take(options: IPipeController, ...args: AnyArgs): void {
    if (i < count) {
      options.next(...args);
      i += 1;
    }
  }

  return _take;
}
