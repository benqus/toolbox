import { topic } from '../topic';
import { AnyArgs } from '../common/types';
import { Operator, Pipe, NextFn} from './types';

export function pipe<I extends AnyArgs = AnyArgs, O extends AnyArgs = AnyArgs>(...operations: Array<Operator>): Pipe {
  const _topic = topic<O>();
  let lastOperatorOutput: AnyArgs = [];
  let latestArgs;

  function executeOperation(i: number): void {
    const fn = operations[i];
    if (fn) {
      const nextOperator: NextFn = (...args: AnyArgs): void => {
        lastOperatorOutput = (args.length === 0 ? lastOperatorOutput : args);
        executeOperation(i + 1);
      };
      fn(nextOperator, ...lastOperatorOutput);
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
