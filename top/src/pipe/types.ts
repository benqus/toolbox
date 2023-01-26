import { AnyArgs, Promisable, ILatest, ISubscribable } from '../common/types';

export type Operator = (next: NextFn, ...args: AnyArgs) => Promisable<void>;

export type Pipe<I extends AnyArgs = AnyArgs, O extends AnyArgs = AnyArgs> =
  ILatest<O> & ISubscribable<O> & ((...args: I) => void);

export type NextFn = (...args: AnyArgs) => void;
