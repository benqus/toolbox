import { AnyArgs, Fn, IEmitter, IUnsubscribe } from '../common';

export interface ITopic<Args extends AnyArgs> extends IEmitter<Args> {
  (...args: Args): void;
  subscribe(fn: Fn<Args>): IUnsubscribe;
}
