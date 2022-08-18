import { Args, IExecutableFn, IExecutionOptions } from '../types';

export function delay(ms: number): IExecutableFn {
  function _delay(options: IExecutionOptions, ...args: Args): void {
    setTimeout(() => options.next(...args), ms);
  }

  return _delay;
}
