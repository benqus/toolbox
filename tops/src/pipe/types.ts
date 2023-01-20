import { AnyArgs, Promisable, ILatest, IEmitter } from '../common';

export interface IOperatorFn {
  (next: IPipeController, ...args: AnyArgs): Promisable<void>;
}

export interface IPipeController {
  next(...args: AnyArgs): void;
  end(): void;
}

export interface IPipe extends ILatest, IEmitter {
  (...args: AnyArgs): void;
}
