import { Args, Fn, IExecutableFn, IExecutionOptions } from '../types';

export function fanout(...fns: Array<Fn>): IExecutableFn {
  function _fanout(options: IExecutionOptions, ...args: Args): void {
    fns.forEach((fn) => fn(...args));
    options.next(...args);
  }

  return _fanout;
}
