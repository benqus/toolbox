import { AnyArgs } from '../../common';
import { IOperatorFn, IPipeController } from '../types';

export function delay(ms: number): IOperatorFn {
  function _delay(options: IPipeController, ...args: AnyArgs): void {
    setTimeout(() => options.next(...args), ms);
  }

  return _delay;
}
