export function resolveDependencies<T>(dependencies: Partial<T>, defaults: T): T {
  return Object.assign({}, defaults, dependencies);
}
