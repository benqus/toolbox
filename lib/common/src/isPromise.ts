
export function isPromise<T = any>(o: any): o is Promise<T> {
  return !!o && typeof (o as Promise<T>).then === 'function';
}
