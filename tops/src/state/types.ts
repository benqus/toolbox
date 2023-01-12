import { IObservableFn } from '../observable';
import { ITopic } from '../topic';

export interface IStateFn<T extends object = object> extends ITopic {
  (): T;
  set(key: keyof T, value: T[keyof T]): void;
  get(key: keyof T): IObservableFn<T[keyof T]>;
  value(key: keyof T): T[keyof T];
}
