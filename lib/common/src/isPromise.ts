
export function isPromise<T = unknown>(o: unknown): o is Promise<T> {
  return !!o && typeof (o as Promise<T>).then === 'function';
}
