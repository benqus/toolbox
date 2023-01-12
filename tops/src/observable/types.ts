import { IEmitter, ILatest } from '../common';
import { topic } from '../topic';

export interface IObservableFnDependencies {
  topic: typeof topic;
}

export interface IObservableFn<T> extends ILatest<T>, IEmitter<[T, T]> {
  (newValue: T): void;
}
