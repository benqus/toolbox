import { IEmitter } from '../common';
import { IObservableFn, observable } from '../observable';
import { topic } from '../topic';

export interface IStateFn<T extends object = object> extends IEmitter<[T]> {
  (): T;
  set(key: keyof T, value: T[keyof T]): void;
  get(key: keyof T): IObservableFn<T[keyof T]>;
  value(key: keyof T): T[keyof T];
}

export interface IStateFnDependencies {
  topic: typeof topic;
  observable: typeof observable;
}
