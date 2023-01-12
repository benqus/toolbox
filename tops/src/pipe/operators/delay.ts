import { AnyArgs } from '../../common';
import { IExecutableFn, IPipeController } from '../types';

export function delay(ms: number): IExecutableFn {
  function _delay(options: IPipeController, ...args: AnyArgs): void {
    setTimeout(() => options.next(...args), ms);
  }

  return _delay;
}
