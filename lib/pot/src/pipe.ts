import { topic } from './topic';
import { Args, IExecutableFn, IPipeFn, IExecutionOptions} from './types';

export function pipe(...fns: Array<IExecutableFn>): IPipeFn {
  let lastArgs: Args = [];

  function createExecutionOptions(i: number): IExecutionOptions {
    function next(...args: Args): void {
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
      _pipe.topic(...lastArgs);
    }
  }

  function _pipe(...args: Args): IPipeFn {
    lastArgs = args;
    _fn(0);
    return _pipe;
  }

  _pipe.latest = (): Args => lastArgs;
  _pipe.topic = topic();

  return _pipe;
}
