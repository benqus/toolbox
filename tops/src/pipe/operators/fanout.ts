import { AnyArgs, Fn } from '../../common';
import { IOperatorFn, IPipeController } from '../types';

export function fanout(...fns: Array<Fn>): IOperatorFn {
  function _fanout(options: IPipeController, ...args: AnyArgs): void {
    fns.forEach((fn) => fn(...args));
    options.next(...args);
  }

  return _fanout;
}
