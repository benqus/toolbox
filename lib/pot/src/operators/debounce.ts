import { AnyArgs, IExecutableFn, IExecutionOptions } from '../types';

export function debounce(ms: number): IExecutableFn {
  let lastArgs: AnyArgs;
  let lastOptions: IExecutionOptions;
  let timeout: NodeJS.Timeout;

  function execute(): void {
    lastOptions.next(...lastArgs);
  }

  function _debounce(options: IExecutionOptions, ...args: AnyArgs): void {
    lastArgs = args;
    lastOptions = options;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(execute, ms);
  }

  return _debounce;
}
