import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function skip(count: number): Operator {
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
