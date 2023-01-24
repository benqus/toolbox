import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function times(count: number): Operator {
  function _times(options: IPipeController, ...args: AnyArgs): void {
    for (let i = 0; i < count; i++) {
      options.next(...args);
    }
  }

  return _times;
}
