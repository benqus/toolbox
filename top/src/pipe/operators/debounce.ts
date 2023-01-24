import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function debounce(ms: number): Operator {
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
