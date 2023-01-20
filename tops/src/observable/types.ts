import { IEmitter } from '../common';
import { topic } from '../topic';

export interface IObservableDependencies {
  topic: typeof topic;
}

export type TObservable<T> = T & IEmitter<[T]>;
