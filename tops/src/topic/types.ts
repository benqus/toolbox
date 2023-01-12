import { IEmitter, AnyArgs } from '../common';

export interface ITopicFn<Args extends AnyArgs = AnyArgs> extends IEmitter<Args> {
  (...args: Args): void;
}
