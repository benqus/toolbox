import { AnyArgs, Fn, IExecutableFn, IExecutionOptions } from '../types';

export function fanout(...fns: Array<Fn>): IExecutableFn {
  function _fanout(options: IExecutionOptions, ...args: AnyArgs): void {
    fns.forEach((fn) => fn(...args));
    options.next(...args);
  }

  return _fanout;
}
