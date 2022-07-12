export function initializeContext() {
  const subscribers: Set<Function> = new Set();
  let ut: NodeJS.Timeout | null = null;

  function triggerSubscribers() {
    ut && clearTimeout(ut);
    ut = null;
    subscribers.forEach(fn => fn());
  }

  return class Context<T extends object = object> {
    public static subscribe(fn: Function): void {
      subscribers.add(fn);
    }
  
    public static unsubscribe(fn: Function): void {
      subscribers.delete(fn);
    }
  
    constructor(private _value: T) {}

    public get value(): T { return this._value; }

    public set value(value: T | Partial<T>) {
      Object.assign(this._value, value);
      ut = ut ?? setTimeout(triggerSubscribers, 0);
    }
  }
}
