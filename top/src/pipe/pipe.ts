import { topic } from '../topic';
import { AnyArgs } from '../common/types';
import { Operator, Pipe, IPipeController} from './types';

export function pipe<I extends AnyArgs = AnyArgs, O extends AnyArgs = AnyArgs>(...operations: Array<Operator>): Pipe {
  const _topic = topic<O>();
  let lastOperatorOutput: AnyArgs = [];
  let latestArgs;

  function createPipeController(i: number): IPipeController {
    function next(...args: AnyArgs): void {
      lastOperatorOutput = (args.length === 0 ? lastOperatorOutput : args);
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
      fn(options, ...lastOperatorOutput);
    } else {
      latestArgs = lastOperatorOutput;
      _topic(...latestArgs);
    }
  }

  function _pipe(...args: I): Pipe {
    lastOperatorOutput = args;
    executeOperation(0);
    return _pipe;
  }

  _pipe.latest = (): O => latestArgs ?? [] as O;
  _pipe.subscribe = _topic.subscribe;

  return _pipe;
}
