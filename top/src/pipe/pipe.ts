import { topic } from '../topic';
import { AnyArgs } from '../common/types';
import { IOperatorFn, IPipe, IPipeController} from './types';

export function pipe(...operations: Array<IOperatorFn>): IPipe {
  const _topic = topic();
  let lastArgs: AnyArgs = [];

  function createPipeController(i: number): IPipeController {
    function next(...args: AnyArgs): void {
      lastArgs = (args.length === 0 ? lastArgs : args);
      executeOperation(i + 1);
    }

    function end(): void {
      executeOperation(operations.length);
    }

    return Object.freeze({ next, end });
  }

  function executeOperation(i: number): void {
    const fn = operations[i];
    if (fn) {
      const options = createPipeController(i);
      fn(options, ...lastArgs);
    } else {
      _topic(...lastArgs);
    }
  }

  function _pipe(...args: AnyArgs): IPipe {
    lastArgs = args;
    executeOperation(0);
    return _pipe;
  }

  _pipe.latest = (): AnyArgs => lastArgs;
  _pipe.subscribe = _topic.subscribe;

  return _pipe;
}
