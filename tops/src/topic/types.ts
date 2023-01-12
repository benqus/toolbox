import { Fn, AnyArgs } from '../common';

export type UnsubscribeFn = () => void;

export interface ITopic<T = void> {
  subscribe(fn: Fn): UnsubscribeFn;
  unsubscribe(fn: Fn): T;
  clear(): T;
}

export interface ITopicFn<Args extends AnyArgs = AnyArgs> extends ITopic<ITopicFn<Args>> {
  (...args: Args): void;
}
