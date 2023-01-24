import { AnyArgs } from '../../common/types';
import { Operator, IPipeController } from '../types';

export function throttle(ms = 0): Operator {
  let lastArgs: AnyArgs;
  let lastController: IPipeController;
  let timeout: NodeJS.Timeout | void;

  function execute(): void {
    timeout = clearTimeout(timeout as NodeJS.Timeout);
    lastController.next(...lastArgs);
  }

  function _throttle(options: IPipeController, ...args: AnyArgs): void {
    lastArgs = args;
    lastController = options;
    timeout = timeout ?? setTimeout(execute, ms);
  }

  return _throttle;
}
