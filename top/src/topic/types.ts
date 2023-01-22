import { AnyArgs, ISubscribable, ILatest } from '../common/types';

export interface ITopic<Args extends AnyArgs> extends ISubscribable<Args> {
  (...args: Args): void;
}
