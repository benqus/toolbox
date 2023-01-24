import { AnyArgs, Promisable, ILatest, ISubscribable } from '../common/types';

export type Operator = (next: IPipeController, ...args: AnyArgs) => Promisable<void>;

export type Pipe<I extends AnyArgs = AnyArgs, O extends AnyArgs = AnyArgs> =
  ILatest<O> & ISubscribable<O> & ((...args: I) => void);

export interface IPipeController {
  next(...args: AnyArgs): void;
  end(): void;
}
