import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function delay(ms: number): Operator {
  function _delay(options: IPipeController, ...args: AnyArgs): void {
    setTimeout(() => options.next(...args), ms);
  }

  return _delay;
}
