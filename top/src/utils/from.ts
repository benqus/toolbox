import { AnyArgs, ISubscribable, Unsubscriber } from '../common/types';
import { pipe } from '../pipe/pipe';
import { Operator, Pipe } from '../pipe/types';

export function from<I extends AnyArgs, O extends AnyArgs>(
  subscribable: ISubscribable,
  operators: Array<Operator>,
): [ Pipe<I, O>, Unsubscriber ] {
  const _pipe = pipe<I, O>(...operators);
  const unsubscribe = subscribable.subscribe(_pipe);
  return [ _pipe, unsubscribe ];
}
