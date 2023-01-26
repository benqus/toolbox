import { AnyArgs } from '../../common/types';
import { Operator, NextFn } from '../types';

export function throttle(ms = 0): Operator {
  let lastArgs: AnyArgs;
  let lastNextFn: NextFn;
  let timeout: NodeJS.Timeout | void;

  function execute(): void {
    timeout = clearTimeout(timeout as NodeJS.Timeout);
    lastNextFn(...lastArgs);
  }

  function _throttle(next: NextFn, ...args: AnyArgs): void {
    lastArgs = args;
    lastNextFn = next;
    timeout = timeout ?? setTimeout(execute, ms);
  }

  return _throttle;
}
