export type Args = Array<unknown>;

export type Listener<T extends Args = Args> = (...args: T) => void;

export type ListenerSet<T extends Args = Args> = Set<Listener<T>>;
