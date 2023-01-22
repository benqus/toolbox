import { AnyArgs, Promisable, ILatest, ISubscribable } from '../common/types';

export interface IOperatorFn {
  (next: IPipeController, ...args: AnyArgs): Promisable<void>;
}

export interface IPipeController {
  next(...args: AnyArgs): void;
  end(): void;
}

export interface IPipe extends ILatest, ISubscribable {
  (...args: AnyArgs): void;
}
