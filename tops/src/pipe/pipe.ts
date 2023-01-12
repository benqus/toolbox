import { topic } from '../topic';
import { AnyArgs } from '../common';
import { IOperatorFn, IPipeFn, IPipeController} from './types';

export function pipe(...fns: Array<IOperatorFn>): IPipeFn {
  let lastArgs: AnyArgs = [];
  const _topic = topic();

  function createPipeController(i: number): IPipeController {
    function next(...args: AnyArgs): void {
      lastArgs = (args.length === 0 ? lastArgs : args);
      _fn(i + 1);
    }

    function end(): void {
      _fn(fns.length);
    }

    return { next, end };
  }

  function _fn(i: number): void {
    const fn = fns[i];
    if (fn) {
      const options = createPipeController(i);
      fn(options, ...lastArgs);
    } else {
      _topic(...lastArgs);
    }
  }

  function _pipe(...args: AnyArgs): IPipeFn {
    lastArgs = args;
    _fn(0);
    return _pipe;
  }

  _pipe.latest = (): AnyArgs => lastArgs;
  _pipe.listen = _topic.listen;
  _pipe.kill = _topic.kill;

  return _pipe;
}
