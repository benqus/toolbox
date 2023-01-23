import { AnyArgs, ISubscribable, Fn, Promisable } from '../common/types';

export type Publisher<Args extends AnyArgs = AnyArgs> = (fn: Fn<Args>, args: Args) => Promisable<void>;

export interface ITopic<Args extends AnyArgs> extends ISubscribable<Args> {
  (...args: Args): void;
}
