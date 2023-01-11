import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function throttle(ms: number): IExecutableFn {
  let lastArgs: AnyArgs;
  let lastOptions: IExecutionOptions;
  let timeout: NodeJS.Timeout | void;

  function execute(): void {
    timeout = clearTimeout(timeout as NodeJS.Timeout);
    lastOptions.next(...lastArgs);
  }

  function _throttle(options: IExecutionOptions, ...args: AnyArgs): void {
    lastArgs = args;
    lastOptions = options;
    timeout = timeout ?? setTimeout(execute, ms);
  }

  return _throttle;
}
