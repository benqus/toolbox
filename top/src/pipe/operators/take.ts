import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function take(count: number): Operator {
  let i = 0;

  function _take(options: IPipeController, ...args: AnyArgs): void {
    if (i < count) {
      options.next(...args);
      i += 1;
    }
  }

  return _take;
}
