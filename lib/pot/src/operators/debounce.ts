import { Args, IExecutableFn, IExecutionOptions } from '../types';

export function debounce(ms: number): IExecutableFn {
  let lastArgs: Args;
  let lastOptions: IExecutionOptions;
  let timeout: NodeJS.Timeout;

  function execute(): void {
    lastOptions.next(...lastArgs);
  }

  function _debounce(options: IExecutionOptions, ...args: Args): void {
    lastArgs = args;
    lastOptions = options;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(execute, ms);
  }

  return _debounce;
}
