import { topic } from './topic';
import { IStop, Stop } from './stop';
import { FnArgs, IFnPipe, IFn, Promisable } from './types';

export function pipe(...fns: Array<IFn<FnArgs, unknown | IStop> | IStop>): IFnPipe {
  const t = topic();

  let latestArgs: FnArgs = [];

  function _callSubjectAndReturn(): unknown {
    t(...latestArgs);
    return latestArgs;
  }

  function _fnNext(output: unknown, args: FnArgs, i: number): Promisable<unknown> {
    output = typeof output === 'undefined' ? args : output;
    output = Array.isArray(output) ? output : [ output ];
    return _fn(latestArgs = output as FnArgs, i + 1);
  }

  function _fn(args: FnArgs, i: number): Promisable<unknown> {
    latestArgs = args;
    const fn = fns[i];
    if (!fn || fn === Stop) return _callSubjectAndReturn();

    const out = (fn as IFn)(...args);
    if (out === Stop) return _callSubjectAndReturn();
    if (out != null && typeof (out as Promise<unknown>).then === 'function') {
      return (out as Promise<unknown>).then((_out: unknown): unknown => _fnNext(_out, args, i));
    }
    return _fnNext(out, args, i);
  }

  function _pipe(...args: FnArgs): Promisable<unknown> {
    return _fn(args, 0);
  }

  _pipe.$empty = (): FnArgs => latestArgs = [];
  _pipe.$latest = (): unknown => latestArgs;
  _pipe.$subscribe = t.$subscribe;
  _pipe.$unsubscribe = t.$unsubscribe;

  return _pipe;
}
