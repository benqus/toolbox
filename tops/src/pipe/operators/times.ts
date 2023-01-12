import { AnyArgs } from '../../common';
import { IOperatorFn, IPipeController } from '../types';

export function times(count: number): IOperatorFn {
  function _times(options: IPipeController, ...args: AnyArgs): void {
    for (let i = 0; i < count; i++) {
      options.next(...args);
    }
  }

  return _times;
}
