
export function isPromise<T = unknown>(o: unknown): o is Promise<T> {
  return o != null && typeof (o as Promise<T>).then === 'function';
}
