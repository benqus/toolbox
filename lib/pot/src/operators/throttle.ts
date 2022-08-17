import { Args, IExecutableFn, IExecutionOptions } from '../types';

export function throttle(ms: number): IExecutableFn {
  let lastArgs: Args;
  let lastOptions: IExecutionOptions;
  let timeout: NodeJS.Timeout | void;

  function execute(): void {
    timeout = clearTimeout(timeout as NodeJS.Timeout);
    lastOptions.next(...lastArgs);
  }

  function _throttle(options: IExecutionOptions, ...args: Args): void {
    lastArgs = args;
    lastOptions = options;
    timeout = timeout ?? setTimeout(execute, ms);
  }

  return _throttle;
}
