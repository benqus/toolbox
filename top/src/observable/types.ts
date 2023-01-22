import { ISubscribable, ILatest } from '../common/types';

export type TObservable<T> = T & ISubscribable<[T]>;
