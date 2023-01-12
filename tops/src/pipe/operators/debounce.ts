import { AnyArgs } from '../../common';
import { IExecutableFn, IPipeController } from '../types';

export function debounce(ms: number): IExecutableFn {
  let lastArgs: AnyArgs;
  let lastOptions: IPipeController;
  let timeout: NodeJS.Timeout;

  function execute(): void {
    lastOptions.next(...lastArgs);
  }

  function _debounce(options: IPipeController, ...args: AnyArgs): void {
    lastArgs = args;
    lastOptions = options;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(execute, ms);
  }

  return _debounce;
}