import { ILatest } from '../common';
import { ITopic, ITopicFn } from '../topic';

export interface IObservableFn<T> extends ILatest<T>, ITopic<ITopicFn<[T, T]>> {
  (newValue: T): void;
}
