import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function debounce(ms: number): Operator {
  let lastArgs: AnyArgs;
  let lastNextFn: NextFn;
  let timeout: NodeJS.Timeout;

  function execute(): void {
    lastNextFn(...lastArgs);
  }

  function _debounce(next: NextFn, ...args: AnyArgs): void {
    lastArgs = args;
    lastNextFn = next;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(execute, ms);
  }

  return _debounce;
}
