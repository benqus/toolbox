import { topic } from './topic';
import { AnyArgs, IExecutableFn, IPipeFn, IExecutionOptions} from './types';

export function pipe(...fns: Array<IExecutableFn>): IPipeFn {
  let lastArgs: AnyArgs = [];
  const _topic = topic();

  function createExecutionOptions(i: number): IExecutionOptions {
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
      const options = createExecutionOptions(i);
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
  _pipe.subscribe = _topic.subscribe;
  _pipe.unsubscribe = _topic.unsubscribe;
  _pipe.clear = _topic.clear;

  return _pipe;
}
