import { AnyArgs, Fn } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function fanout(...fns: Array<Fn>): Operator {
  function _fanout(options: IPipeController, ...args: AnyArgs): void {
    fns.forEach((fn) => fn(...args));
    options.next(...args);
  }

  return _fanout;
}
