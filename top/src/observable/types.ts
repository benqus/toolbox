import { ISubscribable } from '../common/types';

export type Observable<T> = T & ISubscribable<[T]>;
