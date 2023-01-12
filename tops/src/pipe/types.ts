import { AnyArgs, Promisable, ILatest } from '../common';
import { ITopic, ITopicFn } from '../topic';

export interface IExecutableFn {
  (next: IPipeController, ...args: AnyArgs): Promisable<void>;
}

export interface IPipeController {
  next(...args: AnyArgs): void;
  end(): void;
}

export interface IPipeFn extends ILatest, ITopic<ITopicFn<AnyArgs>> {
  (...args: AnyArgs): void;
}
